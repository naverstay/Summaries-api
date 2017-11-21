import pick from 'lodash/pick';
import { Summary } from '../models';
import { SummaryService } from '../services';

export default {
  async create(ctx) {
    const summaryData = {
      ...pick(ctx.request.body, Summary.createFields),
      userHash: ctx.state.user.hash,
    };

    const { _id } = await SummaryService.createSummary(summaryData);
    const summary = await Summary.findOne({ _id });

    ctx.status = 201;
    ctx.body = { data: summary };
  },

  async update(ctx) {
    const {
      request: {
        body,
      },
      state: {
        user: {
          hash,
        },
        summary,
      },
    } = ctx;

    if (summary.userHash !== hash) {
      ctx.throw(403, `Forbidden. Summary with hash "${summary.hash}" dont belong to user with hash ${hash}`);
    }

    const newData = pick(body, Summary.createFields);
    const updatedSummary = await SummaryService.updateSummary(newData, summary);

    ctx.body = { data: updatedSummary };
  },

  async delete(ctx) {
    const {
      state: {
        user: {
          hash,
        },
        summary,
      },
    } = ctx;

    if (summary.userHash !== hash) {
      ctx.throw(403, `Forbidden. Summary with hash "${summary.hash}" dont belong to user with id ${hash}`);
    }

    await summary.remove();

    ctx.body = { data: { id: summary.hash } };
  },

  getSummary(ctx) {
    const { state: { summary } } = ctx;

    ctx.body = { data: pick(summary, Summary.createFields) };
  },

  async searchSummaries(ctx) {
    const MAX_SIZE = 20;
    const OFFSET = 0;
    const queryParams = pick(ctx.request.query, ['title', 'tags', 'size', 'offset']);
    const pagination = {
      title: queryParams.title ? queryParams.title : '',
      tags: queryParams.tags ? queryParams.tags.split(',') : [],
      size: parseInt(queryParams.size),
      offset: parseInt(queryParams.offset),
    };

    if (!pagination.size || pagination.size > MAX_SIZE) {
      pagination.size = MAX_SIZE;
    }

    if (!pagination.offset) {
      pagination.offset = OFFSET;
    }

    const data = await SummaryService.search(pagination);

    ctx.body = { data };
  },
};
