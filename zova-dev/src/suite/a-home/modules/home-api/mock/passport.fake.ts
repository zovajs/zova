import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __users = [{ name: 'admin', password: '123456', avatar: ':emoji:flower' }];

export default defineFakeRoute([
  {
    url: '/home/user/passport/login',
    method: 'post',
    response: req => {
      const user = __users.find(item => item.name === req.body.username);
      if (!user) {
        return { code: 403, message: 'Error' };
      }
      return {
        code: 0,
        message: 'Success',
        data: {
          passport: {
            user: {
              name: user.name,
              avatar: user.avatar,
            },
            auth: {
              id: 1,
            },
          },
          jwt: {
            accessToken: `accessToken-${user.name}`,
            refreshToken: `refreshToken-${user.name}`,
            expiresIn: 2 * 3600,
          },
        },
      };
    },
  },
  {
    url: '/home/user/passport/current',
    method: 'get',
    response: req => {
      const name = getNameFromAuthorizationHeader(req);
      const user = __users.find(item => item.name === name);
      if (!user) {
        return { code: 403, message: 'Error' };
      }
      return {
        code: 0,
        message: 'Success',
        data: {
          user: {
            name: user.name,
            avatar: user.avatar,
          },
          auth: {
            id: 1,
          },
        },
      };
    },
  },
  {
    url: '/home/user/passport/logout',
    method: 'post',
    response: req => {
      const name = getNameFromAuthorizationHeader(req);
      const user = __users.find(item => item.name === name);
      if (!user) {
        return { code: 403, message: 'Error' };
      }
      return {
        code: 0,
        message: 'Success',
      };
    },
  },
  {
    url: '/home/user/passport/refreshAuthToken',
    method: 'post',
    response: req => {
      const name = req.body.refreshToken.substring('refreshToken-'.length);
      const user = __users.find(item => item.name === name);
      if (!user) {
        return { code: 401, message: 'Error' };
      }
      return {
        code: 0,
        message: 'Success',
        data: {
          accessToken: `accessToken-${user.name}`,
          refreshToken: `refreshToken-${user.name}`,
          expiresIn: 2 * 3600,
        },
      };
    },
  },
]);

function getNameFromAuthorizationHeader(req: any): string | undefined {
  if (!req.headers.authorization) return undefined;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return undefined;
  return token.substring('accessToken-'.length);
}
