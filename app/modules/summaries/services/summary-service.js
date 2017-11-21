import { Summary } from '../models';

export default {
  async createSummary(data) {
    const { userHash } = data;
    const summaryCountByUserId = await Summary.count({ userHash });

    if (summaryCountByUserId === 3) {
      throw new AppError({ status: 400, message: 'User can have no more than three summary' });
    }

    return Summary.create(data);
  },

  updateSummary(data, summary) {
    summary.set(data);

    try {
      return summary.save();
    } catch (e) {
      throw new AppError({ status: 400, ...e });
    }
  },

  async search({
    tags,
    size,
    offset,
    title,
  }) {
    const query = {
      title: { $regex: title },
    };

    if (tags.length) {
      query.tags = tags;
    }

    const count = await Summary
      .count(query)
      .sort({ updatedAt: '-1' });
    const pages = count / size;
    const summaries = await Summary
      .find(query)
      .sort({ updatedAt: '-1' })
      .limit(size)
      .skip(offset);

      return {
        summaries,
        count,
        pages,
      };
  },
};
