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
    fileName: string;
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
    const sceneName = argv.sceneName;
    argv.sceneNameCapitalize = this.helper.firstCharToUpperCase(sceneName);
    // scene meta
    // onionScenesMeta
    const onionScenesMeta = getOnionScenesMeta(this.modulesMeta.modules);
    const onionSceneMeta = onionScenesMeta[sceneName];
    // bean name
    let beanName = argv.beanName;
    let beanDir;
    if (beanName.includes('/')) {
      // service in component/page
      const pos = beanName.lastIndexOf('/');
      const subDir = beanName.substring(0, pos);
      beanDir = path.join(targetDir, `src/${subDir}`);
      beanName = argv.beanName = beanName.substring(pos + 1);
      argv.fileName = `${sceneName}.${beanName}`;
    } else {
      beanDir = path.join(targetDir, onionSceneMeta.sceneIsolate ? `src/${sceneName}` : 'src/bean');
      argv.fileName = onionSceneMeta.sceneIsolate ? beanName : `${sceneName}.${beanName}`;
    }
    argv.beanNameCapitalize = this.helper.firstCharToUpperCase(beanName);
    // file
    const beanFile = path.join(beanDir, `${argv.fileName}.ts`);
    if (fs.existsSync(beanFile)) {
      throw new Error(`${sceneName} bean exists: ${beanName}`);
    }
    // moduleResourceName
    argv.moduleResourceName = this.helper.combineModuleNameAndResource(argv.moduleInfo.relativeName, argv.beanName);
    // dir
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
