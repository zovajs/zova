import { defineBoot } from '@quasar/app-vite/wrappers';
import { cast } from 'zova';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.sass';
import '../css/app.scss';

export default defineBoot(({app, ssrContext}) => {
  const quasarUserOptions = {
    config: {
      dark: process.env.CLIENT ? window.ssr_themedark : 'auto',
    },
  };
  cast(app.use)(Quasar, quasarUserOptions, ssrContext);
});
