import chalk from 'chalk';
export function printBanner(_context, flavor) {
    return async function printBanner(_conf, api) {
        const mode = api.ctx.prod ? 'production' : 'development';
        const appMode = api.ctx.modeName;
        // log
        setTimeout(() => {
            _print(mode, appMode);
        }, 3000);
    };
    function _print(mode, appMode) {
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
