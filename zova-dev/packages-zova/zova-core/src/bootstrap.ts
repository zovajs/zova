import { App } from 'vue';
import { PluginFreeze } from 'vue-plugin-render-freeze';
import { PluginBean } from './plugins/bean.js';

export async function bootstrap({ app }: { app: App }) {
  app.use(PluginBean);
  app.use(PluginFreeze);
}
