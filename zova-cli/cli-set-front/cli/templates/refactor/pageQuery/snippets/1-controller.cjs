const __snippet_export = `export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;\n`;

module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  parseOptions: { language: 'plain' },
  async transform({ ast, argv }) {
    // check if exists
    if (ast.includes(`${argv.controllerClassName}SchemaQuery`)) throw new Error('Query exists');
    // zz
    if (!ast.match(/import \{[^\}]*zz[^\}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^\}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, zz } from 'zova';`;
      });
    }
    // export
    ast = ast.replace(
      '@Controller',
      `export const ${argv.controllerClassName}SchemaQuery = zz.object({});\n\n@Controller`,
    );
    // ok
    return ast;
  },
};
