import { defineBoot } from '@quasar/app-vite/wrappers';
import { bootstrap } from 'zova';
// @ts-ignore ignore
import { getPluginZovaOptions } from '../../../.zova/app/utils.js';

export default defineBoot(async ({ app }) => {
  await bootstrap(app, getPluginZovaOptions());
});
