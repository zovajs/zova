import path from 'node:path';
import fse from 'fs-extra';
import { getOutDir } from 'zova-vite';
export function extendAfterBuild(context, _flavor) {
    return async function extendAfterBuild(_conf, _api) {
        // remove dist/ssr/server
        fse.removeSync(path.join(getOutDir(), 'server'));
        // remove zova/runtime
        fse.removeSync(path.join(context.configOptions.appDir, context.configOptions.runtimeDir));
    };
}
//# sourceMappingURL=extendAfterBuild.js.map