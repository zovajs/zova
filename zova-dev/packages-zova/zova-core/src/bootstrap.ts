import { App } from 'vue';
import { PluginBean } from './plugins/bean.js';
import { PluginFreeze } from './plugins/freeze.js';

export async function bootstrap({ app }: { app: App }) {
  app.use(PluginFreeze);
  app.use(PluginBean);
}
