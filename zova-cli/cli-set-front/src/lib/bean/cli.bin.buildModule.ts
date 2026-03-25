import type { OutputOptions, RolldownBuild, RolldownOptions } from 'rolldown';
import type { UserConfig } from 'vite';

import { BeanCliBase } from '@cabloy/cli';
import path from 'node:path';
import { rimraf } from 'rimraf';
import { rolldown } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { build } from 'vite';

declare module '@cabloy/cli' {
  interface ICommandArgv {
    minify: boolean;
    sourcemap: boolean;
  }
}

export class CliBinBuildModule extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    const projectPath = argv.projectPath;
    await this._vite(projectPath);
  }

  async _vite(projectPath: string) {
    await rimraf(path.join(projectPath, 'dist'));
    await this._buildSrc(projectPath);
    await this._buildDts(projectPath);
  }

  async _buildDts(projectPath: string) {
    const { argv } = this.context;

    const sourceMap = argv.sourcemap;

    const inputOptions: RolldownOptions = {
      input: 'src/index.ts',
      plugins: [
        dts({
          tsconfig: 'tsconfig.build.json',
          emitDtsOnly: true,
        }),
      ],
      external: id => {
        return !id.startsWith('.') && !path.isAbsolute(id);
      },
    };

    const outputOption: OutputOptions = {
      dir: path.join(projectPath, 'dist'),
      format: 'esm',
      sourcemap: sourceMap,
    };

    let bundle: RolldownBuild | undefined;
    try {
      bundle = await rolldown(inputOptions);
      await bundle.write(outputOption);
    } finally {
      if (bundle) {
        // closes the bundle
        await bundle.close();
      }
    }
  }

  async _buildSrc(_projectPath: string) {
    const { argv } = this.context;

    const viteConfig: UserConfig = {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
          fileName: 'index',
        },
        rolldownOptions: {
          // make sure to externalize deps that shouldn't be bundled
          // into your library
          external: id => {
            return !id.startsWith('.') && !path.isAbsolute(id);
          },
          output: {},
        },
      },
    };
    await build(viteConfig);
  }
}
