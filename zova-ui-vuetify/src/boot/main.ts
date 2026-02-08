import { defineBoot } from '@quasar/app-vite/wrappers';
import vuetify from './vuetify.js';
import '../css/settings.scss';

export default defineBoot(({ app }) => {
  app.use(vuetify);
});
