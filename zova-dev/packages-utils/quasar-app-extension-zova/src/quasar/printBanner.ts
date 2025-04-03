import type { IndexAPI } from '@quasar/app-vite';
import type { ConfigContext, QuasarConf } from './types.js';
import chalk from 'chalk';

export function printBanner(_context: ConfigContext, flavor: string) {
  return async function printBanner(_conf: QuasarConf, api: IndexAPI) {
    const mode = api.ctx.prod ? 'production' : 'development';
    const appMode = api.ctx.modeName;
    // log
    setTimeout(() => {
      _print(mode, appMode);
    }, 3000);
  };

  function _print(mode: string, appMode: string) {
    // eslint-disable-next-line
    console.log(chalk.yellow('\n============ Zova Meta ============'));
    // eslint-disable-next-line
    console.log(`vite mode ......... ${chalk.cyan(mode)}`);
    // eslint-disable-next-line
    console.log(`app mode .......... ${chalk.cyan(appMode)}`);
    // eslint-disable-next-line
    console.log(`flavor ............ ${chalk.cyan(flavor)}`);
    // eslint-disable-next-line
    console.log('\n');
  }
}
