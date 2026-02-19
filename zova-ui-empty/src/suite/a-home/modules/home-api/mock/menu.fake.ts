import { defineFakeRoute } from 'vite-plugin-fake-server-turbo/client';

const __MenuItems = [
  { order: 0, title: 'Home', caption: '', icon: '::home', link: '/' },
  { group: 'basic', title: 'State', caption: 'ref, computed', icon: '', link: '/demo/basic/state' },
  { group: 'basic', title: 'Component', caption: 'props, emits, slots', icon: '', link: '/demo/basic/component' },
  { group: 'vona', title: 'Github', caption: 'github.com/vonajs', icon: ':editor:code', external: true, link: 'https://github.com/vonajs' },
];
const __MenuGroups = [
  { order: 1, name: 'basic', title: 'Basic' },
  { order: 2, name: 'vona', title: 'VonaJS' },
];
const __MenuData = { menus: __MenuItems, groups: __MenuGroups };

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
