import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __users = [{ username: 'admin', password: '123456', avatar: ':emoji:flower' }];

export default defineFakeRoute([
  {
    url: '/home/user/passport/login',
    method: 'post',
    response: req => {
      const user = __users.find(item => item.username === req.body.username);
      if (!user) {
        return { code: 403, message: 'Error' };
      }
      return {
        code: 0,
        message: 'Success',
        data: {
          user: {
            username: user.username,
            avatar: user.avatar,
          },
          auth: {
            id: 1,
          },
          jwt: {
            accessToken: `accessToken-${user.username}`,
            refreshToken: `refreshToken-${user.username}`,
            expiresIn: 2 * 3600,
          },
        },
      };
    },
  },
  {
    url: '/home/user/passport/logout',
    method: 'post',
    response: _req => {
      return {
        code: 0,
        message: 'Success',
      };
    },
  },
]);
