const __snippet_export = `export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;\n`;

module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  parseOptions: { language: 'plain' },
  async transform({ ast, argv }) {
    // check if exists
    if (ast.includes(`${argv.controllerClassName}SchemaParams`)) throw new Error('Params exists');
    // zz
    if (!ast.includes("import { z } from 'zod';")) {
      ast = `import { z } from 'zod';\n${ast}`;
    }
    // export
    ast = ast.replace(
      '@Controller',
      `export const ${argv.controllerClassName}SchemaParams = z.object({});\n\n@Controller`,
    );
    // ok
    return ast;
  },
};
