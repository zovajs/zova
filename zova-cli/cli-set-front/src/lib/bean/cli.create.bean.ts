import { BeanCliBase } from '@cabloy/cli';
import { getOnionMetasMeta, getOnionScenesMeta, IModuleInfo } from '@cabloy/module-info';
import fs from 'fs';
import path from 'path';
import { __ThisSetName__ } from '../this.js';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    module: string;
    moduleInfo: IModuleInfo;
    sceneName: string;
    sceneNameCapitalize: string;
    beanName: string;
    beanNameCapitalize: string;
    moduleResourceName: string;
  }
}

export class CliCreateBean extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // module name/info
    const moduleName = argv.module;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!_module) {
      throw new Error(`module does not exist: ${moduleName}`);
    }
    // target dir
    const targetDir = await this.helper.ensureDir(_module.root);
    // scene name
    const sceneName = argv.sceneName; // bean/summer.cache
    const sceneParts = sceneName.split('.');
    argv.sceneNameCapitalize = sceneParts.map(item => this.helper.firstCharToUpperCase(item)).join();
    // scene meta
    // onionScenesMeta
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    const onionSceneMeta = onionScenesMeta[sceneName];
    // bean name
    const beanName = argv.beanName;
    argv.beanNameCapitalize = this.helper.firstCharToUpperCase(beanName);
    // moduleResourceName
    argv.moduleResourceName = this.helper.combineModuleNameAndResource(argv.moduleInfo.relativeName, argv.beanName);
    // directory
    const beanDir = path.join(targetDir, onionSceneMeta.sceneIsolate ? `src/${sceneName}` : 'src/bean');
    const beanFile = path.join(beanDir, onionSceneMeta.sceneIsolate ? `${beanName}.ts` : `${sceneName}.${beanName}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${sceneName} bean exists: ${beanName}`);
    }
    await this.helper.ensureDir(beanDir);
    // boilerplate name
    const boilerplates = this._getBoilerplates();
    const boilerplateName = boilerplates[`${sceneName}:${argv.beanName}`] || boilerplates[sceneName] || 'bean';
    // render boilerplate
    await this.template.renderBoilerplateAndSnippets({
      targetDir: beanDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: path.isAbsolute(boilerplateName) ? boilerplateName : `bean/${boilerplateName}/boilerplate`,
    });
    // tools.metadata
    await this.helper.invokeCli([':tools:metadata', moduleName], { cwd: argv.projectPath });
  }

  private _getBoilerplates() {
    const result = {};
    // scenes
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    for (const sceneName in onionScenesMeta) {
      const onionSceneMeta = onionScenesMeta[sceneName];
      if (onionSceneMeta.boilerplate) {
        result[sceneName] = path.join(onionSceneMeta.module!.root, onionSceneMeta.boilerplate);
      }
    }
    // metas
    const onionMetasMeta = getOnionMetasMeta(this.modulesMeta.modules);
    for (const sceneName in onionMetasMeta) {
      const onionMetaMeta = onionMetasMeta[sceneName];
      if (onionMetaMeta.boilerplate) {
        result[`meta:${sceneName}`] = path.join(onionMetaMeta.module!.root, onionMetaMeta.boilerplate);
      }
    }
    return result;
  }
}
