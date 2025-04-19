import type { App } from 'vue';
import type { PluginZovaOptions } from './types/interface/pluginZova.js';
import { PluginFreeze } from 'vue-plugin-render-freeze';
import { sys } from './core/sys/sys.js';
import { PluginBean } from './plugins/bean.js';

export async function bootstrap(app: App, options: PluginZovaOptions) {
  await sys.initialize(options);
  app.use(PluginBean);
  app.use(PluginFreeze);
}
