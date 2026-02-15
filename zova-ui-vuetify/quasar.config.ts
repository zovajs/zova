/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';
import Fonts from 'unplugin-fonts/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default configure(_ctx => {
  return {
    build: {
      extendViteConf(viteConf) {
        // Ensure Vuetify is bundled for SSR so Node doesn't try to import raw CSS
        viteConf.ssr = {
          ...(viteConf.ssr || {}),
          noExternal: [...((viteConf.ssr && (viteConf.ssr as any).noExternal) || []), 'vuetify'],
        } as any;
        // plugins
        viteConf.plugins = viteConf.plugins!.concat([
          // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
          <any>Vuetify({
            autoImport: false,
            // styles: {
            //   configFile: 'src/css/settings.scss',
            // },
          }),
          Fonts({
            fontsource: {
              families: [
                {
                  name: 'Roboto',
                  weights: [100, 300, 400, 500, 700, 900],
                  styles: ['normal', 'italic'],
                },
              ],
            },
          }),
        ]);
      },
      viteVuePluginOptions: {
        template: { transformAssetUrls },
      },
    },

    devServer: {
      open: false, // opens browser window automatically
    },
  };
});
