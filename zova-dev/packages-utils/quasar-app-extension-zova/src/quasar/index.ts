/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import type { IndexAPI } from '@quasar/app-vite';
import type { ConfigContext } from './types.js';
import { getFlavor } from 'zova-vite';
import { extendAfterBuild } from './extendAfterBuild.js';
import { extendFilesOne, extendFilesThree, extendFilesTwo } from './extendFiles.js';
import { extendQuasarConf } from './extendQuasarConf.js';
import { extendSSRWebserverConf } from './extendSSRWebserverConf.js';
import { extendViteConf } from './extendViteConf.js';
import { printBanner } from './printBanner.js';

export async function quasar(api: IndexAPI) {
  // flavor
  const flavor = getFlavor();
  // files
  await extendFilesOne(api, flavor)();
  // files
  await extendFilesTwo(api, flavor)();
  // context
  const context = { configMeta: undefined, configOptions: undefined, zovaViteMeta: undefined } as ConfigContext;
  // config
  api.extendQuasarConf(extendQuasarConf(context, flavor));
  api.extendViteConf(extendViteConf(context));
  api.extendSSRWebserverConf(extendSSRWebserverConf(context));
  // before dev
  api.beforeDev(async (api, { quasarConf }) => {
    printBanner(context, flavor)(quasarConf, api);
  });
  // before build
  api.beforeBuild(async (api, { quasarConf }) => {
    // files
    await extendFilesThree(api, flavor)();
    printBanner(context, flavor)(quasarConf, api);
  });
  // after build
  api.afterBuild(async (api, { quasarConf }) => {
    printBanner(context, flavor)(quasarConf, api);
    extendAfterBuild(context, flavor)(quasarConf, api);
  });
}
