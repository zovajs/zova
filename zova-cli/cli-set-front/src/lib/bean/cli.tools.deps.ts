import path from 'node:path';
import { BeanCliBase } from 'zova-cli';
import fse from 'fs-extra';

declare module 'zova-cli' {
  interface ICommandArgv {
    force: boolean;
  }
}

export class CliToolsDeps extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    // generate
    await this._generate(projectPath);
  }

  async _generate(projectPath: string) {
    const pkgFile = path.join(projectPath, 'package.json');
    const pkgOriginalFile = path.join(projectPath, 'package.original.json');
    // check original
    if (!fse.existsSync(pkgOriginalFile)) {
      await fse.copyFile(pkgFile, pkgOriginalFile);
    }
    // pkg/pkgOriginal
    const pkgOriginal = await this.helper.loadJSONFile(pkgOriginalFile);
    if (fse.existsSync(pkgFile)) {
      const pkg = await this.helper.loadJSONFile(pkgFile);
      // save back versions
      await this._saveBackVersions(pkg, pkgOriginal, pkgOriginalFile);
    }
    // generate pkg from pkgOriginal
    await this._generatePkgFromPkgOriginal(pkgOriginal, pkgFile);
    // generate type file
    await this._generateTypeFile(projectPath);
  }

  async _generateTypeFile(projectPath: string) {
    const typeFile = path.join(projectPath, 'src/front/typing/modules.d.ts');
    let content = '';
    // all modules
    this.modulesMeta.modulesArray.forEach(module => {
      content += `import '${module.package.name}';\n`;
    });
    await fse.writeFile(typeFile, content);
  }

  async _generatePkgFromPkgOriginal(pkgOriginal, pkgFile) {
    const devDeps = pkgOriginal.devDependencies;
    // all modules
    this.modulesMeta.modulesArray.forEach(module => {
      if (!devDeps[module.package.name]) {
        devDeps[module.package.name] = '^' + module.package.version;
      }
    });
    // all deps of modules
    this.modulesMeta.modulesArray.forEach(module => {
      const deps = module.package.dependencies;
      if (deps) {
        for (const key in deps) {
          if (!devDeps[key]) {
            devDeps[key] = deps[key];
          }
        }
      }
    });
    await this.helper.saveJSONFile(pkgFile, pkgOriginal);
  }

  async _saveBackVersions(pkg, pkgOriginal, pkgOriginalFile) {
    let changed = false;
    if (pkgOriginal.version !== pkg.version) {
      pkgOriginal.version = pkg.version;
      changed = true;
    }
    for (const field of ['dependencies', 'devDependencies']) {
      const fieldObj = pkg[field];
      const fieldObjOriginal = pkgOriginal[field];
      for (const key in fieldObjOriginal) {
        if (fieldObjOriginal[key] !== fieldObj[key]) {
          fieldObjOriginal[key] = fieldObj[key];
          changed = true;
        }
      }
    }
    if (changed) {
      await this.helper.saveJSONFile(pkgOriginalFile, pkgOriginal);
    }
  }
}