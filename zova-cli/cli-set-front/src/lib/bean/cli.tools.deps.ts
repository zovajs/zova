import { BeanCliBase } from '@cabloy/cli';

declare module '@cabloy/cli' {
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
    // const force = argv.force;
    // generate
    await this._generate(projectPath);
  }

  async _generate(projectPath: string) {
    // generate package.json
    await this.common._generatePackageJson(projectPath);
    // generate type modules file
    await this.common._generateTypeModulesFile(projectPath);
  }
}
