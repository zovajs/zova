/* eslint-env node */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

import { configure } from 'quasar/wrappers';
import { mergeConfig } from 'vite';

export default configure(_ctx => {
  return {
    zovaManualChunk: {
      debug: false,
      vendors: [
        { match: ['ant-design-vue'], output: 'ant-design-vue' },
        { match: ['@ant-design'], output: '@ant-design' },
      ],
    },

    build: {
      extendViteConf(viteConf) {
        viteConf.optimizeDeps = mergeConfig(viteConf.optimizeDeps || {}, {
          //disabled: true,
        });
        viteConf.ssr = mergeConfig(viteConf.ssr || {}, {
          //noExternal: true,
          //noExternal: ['@ant-design', 'ant-design-vue', 'vue'],
          //noExternal: ['ant-design-vue', 'scroll-into-view-if-needed', 'vue'],
          //noExternal: ['ant-design-vue/es/theme/themes/default/colorAlgorithm.js', '@ctrl/tinycolor'],
        });
        // console.log(viteConf.ssr);
      },
      // viteVuePluginOptions: {},
    },

    devServer: {
      open: false, // opens browser window automatically
    },

    ssr: {
      middlewares: [
        'env', // keep this as first one
        'render', // keep this as last one
      ],
    },
  };
});