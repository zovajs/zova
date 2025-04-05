import path from 'node:path';
import fse from 'fs-extra';
import { getAbsolutePathOfModule } from 'zova-vite';
import { resolveTemplatePath } from '../utils.js';
export function extendFiles(api, flavor) {
    return async function extendFiles() {
        // patch templates
        await patchTemplates();
        // prepare templates
        await prepareTemplates();
        // prepare vuetify
        await prepareVuetify();
    };
    async function patchTemplates() {
        // app.js
        fse.copyFileSync(resolveTemplatePath('entry/app.js_'), api.resolve.cli('templates/entry/app.js'));
        // client-entry.js
        fse.copyFileSync(resolveTemplatePath('entry/client-entry.js_'), api.resolve.cli('templates/entry/client-entry.js'));
        // server-entry.js
        fse.copyFileSync(resolveTemplatePath('entry/server-entry.js_'), api.resolve.cli('templates/entry/server-entry.js'));
        // ssr: middlewares/env.ts
        fse.copyFileSync(resolveTemplatePath('modes/ssr/middlewares/env.ts'), api.resolve.ssr('middlewares/env.ts'));
        // ssr: html-template.js
        await _handleSSRHtmlTemplate();
        // ssr: ssr-devserver.js
        await _handleSSRDevServer();
        // ssr: ssr-prod-webserver.js
        await _handleSSRProdWebserver();
    }
    async function prepareTemplates() {
        // ssr
        if (api.ctx.mode.ssr) {
            // prod
            if (api.ctx.prod) {
                copyTemplateIfNeed(resolveTemplatePath('env/.env.ssr.production'), api.resolve.app('env/.env.ssr.production'));
            }
            // admin/front
            if (flavor === 'admin') {
                copyTemplateIfNeed(resolveTemplatePath('env/.env.ssr.admin'), api.resolve.app('env/.env.ssr.admin'));
            }
            else if (flavor === 'front') {
                copyTemplateIfNeed(resolveTemplatePath('env/.env.ssr.front'), api.resolve.app('env/.env.ssr.front'));
            }
        }
    }
    function copyTemplateIfNeed(fileSrc, fileDest) {
        if (!fse.existsSync(fileDest)) {
            fse.copyFileSync(fileSrc, fileDest);
        }
    }
    // html-template
    async function _handleSSRHtmlTemplate() {
        const fileSrc = api.resolve.cli('lib/utils/html-template.js');
        const fileSrcBak = api.resolve.cli('lib/utils/html-template-origin.js');
        copyTemplateIfNeed(fileSrc, fileSrcBak);
        const content = fse.readFileSync(fileSrcBak).toString();
        const contentNew = content
            .replace('const bodyStartTagRE = /(<body[^>]*)(>)/i', 'const bodyStartTagRE = /(<body[^>]*)(>)/i\nconst bodyEndRE = /(<\\/body>)/i')
            .replace(/\.replace\(\s+bodyStartTagRE,/, `.replace(
      bodyEndRE,
      (_, tag) => \`{{ ssrContext._meta.endingBodyTags || '' }}\${ tag }\`
    )
    .replace(
      bodyStartTagRE,`);
        fse.writeFileSync(fileSrc, contentNew);
    }
    // ssr-devserver.js
    async function _handleSSRDevServer() {
        const fileSrc = api.resolve.cli('lib/modes/ssr/ssr-devserver.js');
        const fileSrcBak = api.resolve.cli('lib/modes/ssr/ssr-devserver-origin.js');
        copyTemplateIfNeed(fileSrc, fileSrcBak);
        const content = fse.readFileSync(fileSrcBak).toString();
        const contentNew = content
            .replace("import { green } from 'kolorist'", `import { green } from 'kolorist'
        import { collectCss, renderTeleports } from 'zova-vite'
        import * as path from 'node:path'`)
            .replace('let html = renderTemplate(ssrContext)', `ssrContext._meta.endingHeadTags += collectCss(
          [viteServer.moduleGraph.getModuleById(this.#pathMap.serverEntryFile.replaceAll('\\\\','/'))].concat(
          [...(ssrContext.modules||[])]
            .map((componentPath) => viteServer.moduleGraph.getModuleById(
              path.resolve(componentPath).replaceAll('\\\\','/'),
          )))
        )

        let html = renderTemplate(ssrContext)`)
            .replace('<div id="q-app">${ runtimePageContent }</div>', '<div id="q-app">${ runtimePageContent }</div>${ renderTeleports(ssrContext.teleports) }')
            .replace('viteServer.ssrFixStacktrace(err)', 'console.error(err)')
            .replace("getPackage('vue/server-renderer'", "getPackage('@cabloy/vue-server-renderer'");
        fse.writeFileSync(fileSrc, contentNew);
    }
    // ssr-prod-webserver.js
    async function _handleSSRProdWebserver() {
        const fileSrc = api.resolve.cli('templates/entry/ssr-prod-webserver.js');
        const fileSrcBak = api.resolve.cli('templates/entry/ssr-prod-webserver-origin.js');
        copyTemplateIfNeed(fileSrc, fileSrcBak);
        const content = fse.readFileSync(fileSrcBak).toString();
        const contentNew = content.replace("import { join, basename, isAbsolute } from 'node:path'", "import 'zova-vite/dist/ssrEntry.js'\nimport { join, basename, isAbsolute } from 'node:path'").replace("import { renderToString } from 'vue/server-renderer'", "import { renderToString } from '@cabloy/vue-server-renderer'");
        fse.writeFileSync(fileSrc, contentNew);
    }
    async function prepareVuetify() {
        let modulePath;
        try {
            modulePath = getAbsolutePathOfModule('vuetify', 'lib/framework.mjs');
        }
        catch (_) { }
        if (!modulePath)
            return;
        // copy
        fse.copyFileSync(resolveTemplatePath('vuetify/composables/hydration.mjs'), path.join(modulePath, 'lib/composables/hydration.mjs'));
        fse.copyFileSync(resolveTemplatePath('vuetify/composables/ssrBoot.mjs'), path.join(modulePath, 'lib/composables/ssrBoot.mjs'));
    }
}
//# sourceMappingURL=extendFiles.js.map