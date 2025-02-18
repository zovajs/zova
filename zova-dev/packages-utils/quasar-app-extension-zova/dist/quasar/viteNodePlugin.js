import { normalize } from 'node:path';
import { ViteNode } from './viteNode.js';
export function viteNodePlugin() {
    function markInvalidate(mod) {
        const invalidates = ViteNode.invalidates;
        if (!mod.id) {
            return;
        }
        if (invalidates.has(mod.id)) {
            return;
        }
        invalidates.add(mod.id);
        markInvalidates(mod.importers);
    }
    function markInvalidates(mods) {
        if (!mods) {
            return;
        }
        for (const mod of mods) {
            markInvalidate(mod);
        }
    }
    return {
        name: 'zova:vite-node-server',
        enforce: 'post',
        configureServer(server) {
            function invalidateVirtualModules() {
                for (const [id, mod] of server.moduleGraph.idToModuleMap) {
                    if (id.startsWith('virtual:')) {
                        markInvalidate(mod);
                    }
                }
            }
            server.watcher.on('all', (event, file) => {
                markInvalidates(server.moduleGraph.getModulesByFile(normalize(file)));
                if (event === 'add' || event === 'unlink') {
                    invalidateVirtualModules();
                }
            });
        },
    };
}
