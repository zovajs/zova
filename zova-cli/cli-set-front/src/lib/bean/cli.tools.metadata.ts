import path from 'node:path';
import { BeanCliBase } from '@cabloy/cli';
import { getOnionMetasMeta, getOnionScenesMeta } from '@cabloy/module-info';
import { toUpperCaseFirstChar } from '@cabloy/word-utils';
import fse from 'fs-extra';
import { generateBeanGenerals } from './toolsMetadata/generateBeanGenerals.ts';
import { generateConfig, generateConstant, generateError, generateLocale } from './toolsMetadata/generateConfig.ts';
import { generateIcons } from './toolsMetadata/generateIcons.ts';
import { generateMetadataCustom } from './toolsMetadata/generateMetadataCustom.ts';
import { generateMain, generateMainSys, generateMonkey, generateMonkeySys } from './toolsMetadata/generateMonkey.ts';
import { generateOnions } from './toolsMetadata/generateOnions.ts';
import { generateOptionsPackage } from './toolsMetadata/generateOptionsPackage.ts';
import { generateScope } from './toolsMetadata/generateScope.ts';
import { generateScopeResources } from './toolsMetadata/generateScopeResources.ts';
import { generateScopeResourcesMeta } from './toolsMetadata/generateScopeResourcesMeta.ts';
import { globAllTsFiles } from './toolsMetadata/utils.ts';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliToolsMetadata extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    let moduleNames = argv._;
    const force = argv.force ?? moduleNames.length > 0;
    if (moduleNames.length === 0) {
      moduleNames = this.modulesMeta.modulesArray
        .filter(item => !item.info.node_modules)
        .map(item => item.info.relativeName);
    }
    const total = moduleNames.length;
    for (let index = 0; index < total; index++) {
      const moduleName = moduleNames[index];
      // log
      await this.console.log({
        total,
        progress: index,
        text: moduleName,
      });
      // generate res
      await this._generateMetadata(moduleName, force);
    }
  }

  async _generateMetadata(moduleName: string, force: boolean) {
    const module = this.helper.findModule(moduleName);
    if (!module) throw new Error(`module not found: ${moduleName}`);
    const modulePath = module.root;
    const metaDir = path.join(modulePath, 'src/.metadata');
    const metaIndexFile = path.join(metaDir, 'index.ts');
    if (fse.existsSync(metaIndexFile) && !force) {
      // do nothing
      return;
    }
    await this.helper.ensureDir(metaDir);
    // relativeNameCapitalize
    const relativeNameCapitalize = this.helper.stringToCapitalize(moduleName, '-');
    // onionScenesMeta
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    // content
    let content = '';
    // all files
    const globFiles = await globAllTsFiles(moduleName, modulePath);
    // onions
    const scopeResources = {};
    for (const sceneName in onionScenesMeta) {
      const sceneMeta = onionScenesMeta[sceneName];
      const globFilesScene = globFiles.filter(item => item.sceneName === sceneName);
      // general
      content += await generateOnions(globFilesScene, sceneName, sceneMeta, moduleName, modulePath);
      // scope resources
      if (sceneMeta.scopeResource) {
        const contentScopeResource = await generateScopeResources(
          globFilesScene,
          sceneName,
          sceneMeta,
          moduleName,
          modulePath,
        );
        if (contentScopeResource) {
          content += contentScopeResource;
          scopeResources[sceneName] = `IModule${toUpperCaseFirstChar(sceneName)}`;
        }
      }
      // bean generals
      content += await generateBeanGenerals(globFilesScene, sceneName, sceneMeta, moduleName, modulePath);
      // metas
      if (sceneName === 'meta') {
        const onionMetasMeta = getOnionMetasMeta(this.modulesMeta.modules);
        for (const metaName in onionMetasMeta) {
          const metaMeta = onionMetasMeta[metaName];
          const globFilesMeta = globFiles.filter(item => item.sceneName === 'meta' && item.beanName === metaName);
          if (metaMeta.scopeResource) {
            const contentScopeResourceMeta = await generateScopeResourcesMeta(
              globFilesMeta,
              metaName,
              metaMeta,
              sceneName,
              sceneMeta,
              moduleName,
              modulePath,
            );
            if (contentScopeResourceMeta) {
              content += contentScopeResourceMeta;
              scopeResources[metaName] = `Meta${toUpperCaseFirstChar(metaName)}`;
            }
          }
        }
      }
      // metadata custom
      if (sceneMeta.metadataCustom) {
        content += await generateMetadataCustom(this, globFilesScene, sceneName, sceneMeta, moduleName, modulePath);
      }
    }
    // onions: optionsPackage
    content += await generateOptionsPackage(this, globFiles, onionScenesMeta, moduleName, modulePath);
    // icons
    content += await generateIcons(moduleName, modulePath);
    // config
    const contentConfig = await generateConfig(modulePath);
    content += contentConfig;
    // constant
    const contentConstants = await generateConstant(modulePath);
    content += contentConstants;
    // locale
    const contentLocales = await generateLocale(modulePath);
    content += contentLocales;
    // error
    const contentErrors = await generateError(modulePath);
    content += contentErrors;
    // monkey/monkeySys
    content += await generateMonkey(modulePath);
    content += await generateMonkeySys(modulePath);
    // main/mainSys
    content += await generateMain(modulePath);
    content += await generateMainSys(modulePath);
    // scope
    content += await generateScope(moduleName, relativeNameCapitalize, scopeResources, {
      config: contentConfig,
      errors: contentErrors,
      locales: contentLocales,
      constants: contentConstants,
    });
    // empty
    if (!content.trim()) {
      content = 'export {};';
    } else {
      content = `/* eslint-disable */\n${content}`;
    }
    // save
    await fse.writeFile(metaIndexFile, content);
    // await this.helper.formatFile({ fileName: metaIndexFile, logPrefix: 'format: ' });
    // generate this
    await this._generateThis(moduleName, relativeNameCapitalize, modulePath);
    // index
    await this._generateIndex(modulePath);
  }

  async _generateThis(moduleName: string, relativeNameCapitalize: string, modulePath: string) {
    const thisDest = path.join(modulePath, 'src/.metadata/this.ts');
    if (fse.existsSync(thisDest)) return;
    const content = `export const __ThisModule__ = '${moduleName}';
export { ScopeModule${relativeNameCapitalize} as ScopeModule } from './index.js';
`;
    // save
    await fse.writeFile(thisDest, content);
  }

  async _generateIndex(modulePath: string) {
    const jsExport = "export * from './.metadata/index.js';";
    const jsFile = path.join(modulePath, 'src/index.ts');
    let jsContent;
    if (fse.existsSync(jsFile)) {
      jsContent = (await fse.readFile(jsFile)).toString();
      if (jsContent.includes(jsExport)) return;
      jsContent = `${jsExport}\n${jsContent}`;
      jsContent = jsContent.replace('export {};\n', '');
    } else {
      jsContent = `${jsExport}\n`;
    }
    await fse.writeFile(jsFile, jsContent);
  }
}
