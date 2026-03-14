import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __MenuItems = [
  { order: 0, title: 'Home', caption: '', icon: '::home', link: '/' },
  {  title: 'State', caption: 'ref, computed', icon: '', link: '/demo/basic/state' },
  {  title: 'Component', caption: 'props, emits, slots', icon: '', link: '/demo/basic/component' },
  {  title: 'GitHub', caption: 'github.com/zovajs/zova', icon: ':social:github', external: true, link: 'https://github.com/zovajs/zova' },
];
const __MenuData = { menus: __MenuItems };

export default defineFakeRoute([
  {
    url: '/home/base/menu/{:publicPath}',
    method: 'get',
    response: req => {
      const name = getNameFromAuthorizationHeader(req);
      if (!name) {
        return { code: 401, message: 'Error menu/select' };
      }
      return {
        code: 0,
        message: 'Success',
        data: __MenuData,
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
