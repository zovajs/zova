import fs from 'node:fs';
import path from 'node:path';

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
  async transform({ ast }) {
    // check if exists
    if (ast.includes('export type ParamsInput')) throw new Error('Params exists');
    // zz
    if (!ast.match(/import \{[^\}]*zz[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, zz } from 'zova';`;
      });
    }
    // export
    ast = ast.replace('@Local', `${__snippet_export}\n@Local`);
    // BeanControllerPageBase
    ast = ast.replace(/BeanControllerPageBase<(.*?)> \{/, (_, $1) => {
      const parts = $1.split(',');
      if (!parts[1]) parts[1] = ' unknown';
      parts[2] = ' ParamsOutput';
      return `BeanControllerPageBase<${parts.join(',')}> {`;
    });
    // ok
    return ast;
  },
};
