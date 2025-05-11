import path from 'node:path';
import fse from 'fs-extra';
import { getOutDir, getOutReleasesDir } from 'zova-vite';
export function extendAfterBuild(context, _flavor) {
    return async function extendAfterBuild(_conf, _api) {
        const outDir = path.join(context.configOptions.appDir, getOutDir());
        // remove dist/ssr/server
        fse.removeSync(path.join(outDir, 'server'));
        // remove zova/runtime
        fse.removeSync(path.join(context.configOptions.appDir, context.configOptions.runtimeDir));
        // copy
        const outReleasesDir = path.join(context.configOptions.appDir, getOutReleasesDir());
        fse.removeSync(outReleasesDir);
        fse.copySync(outDir, outReleasesDir);
        // copy
        if (process.env.BUILD_COPY_DIST) {
            const outDirCopy = path.join(process.env.BUILD_COPY_DIST, path.basename(outDir));
            fse.removeSync(outDirCopy);
            fse.copySync(outDir, outDirCopy);
        }
        if (process.env.BUILD_COPY_RELEASE) {
            const outReleasesDirCopy = path.join(process.env.BUILD_COPY_RELEASE, path.basename(outReleasesDir));
            fse.removeSync(outReleasesDirCopy);
            fse.copySync(outDir, outReleasesDirCopy);
        }
    };
}
//# sourceMappingURL=extendAfterBuild.js.map