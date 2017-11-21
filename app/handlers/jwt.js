import jwtService from '../services/jwt-service';
import { User } from '../modules/users';

export default () => async (ctx, next) => {
  const { authorization } = ctx.headers;

  if (authorization) {
    try {
      const { email } = await jwtService.verify(authorization);

      const user = await User.findOne({ email });

      if (!user) {
        throw new AppError({ status: 401, message: `User with email "${email}" not found` });
      }

      ctx.state.user = user;
    } catch ({ status = 401, message = 'Unauthorized. Invalid token' }) {
      ctx.throw(status, { message });
    }
  }

  await next();
};
