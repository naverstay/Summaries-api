import UserService from '../services';
import { Summary } from '../../summaries';

export default {
  async getCurrentUser(ctx) {
    const { user: { _id } } = ctx;
    const user = await UserService.getUserWithPublicFields({ _id });

    ctx.body = { data: user };
  },

  async getSummariesByUserHash(ctx) {
    const { user: { hash: userHash } } = ctx;
    const summaries = await Summary.find({ userHash });

    ctx.body = { data: summaries };
  },
};
