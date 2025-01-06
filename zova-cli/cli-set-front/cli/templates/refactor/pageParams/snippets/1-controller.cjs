const fs = require('node:fs');
const path = require('node:path');

const __snippet_export = `export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;\n`;

module.exports = {
  file: ({ cli, argv }) => {
    const _module = cli.helper.findModule(argv.module);
    const controllerFile = path.join(_module.root, `src/page/${argv.nameMeta.short}/controller.ts`);
    if (fs.existsSync(controllerFile)) {
      return 'controller.ts';
    }
    return 'controller.tsx';
  },
  parseOptions: { language: 'plain' },
  async transform({ ast, argv }) {
    // check if exists
    if (ast.includes(`${argv.controllerClassName}SchemaParams`)) throw new Error('Params exists');
    // zz
    if (!ast.match(/import \{[^\}]*zz[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, zz } from 'zova';`;
      });
    }
    // export
    ast = ast.replace(
      '@Controller',
      `export const ${argv.controllerClassName}SchemaParams = zz.object({});\n\n@Controller`,
    );
    // ok
    return ast;
  },
};
