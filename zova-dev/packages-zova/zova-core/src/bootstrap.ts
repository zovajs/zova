import { App } from 'vue';
import { PluginBean } from './plugins/bean.js';

export async function bootstrap({ app }: { app: App }) {
  app.use(PluginBean);
}
