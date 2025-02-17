module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  language: 'plain',
  async transform({ cli, ast, argv }) {
    const modelName = argv.modelName;
    const localName = modelName === 'modelValue' ? modelName : `model${cli.helper.firstCharToUpperCase(modelName)}`;
    const eventName = `update:${modelName}`;
    if (ast.includes(`e: '${eventName}'`))
      throw new Error('Model exists');
    // @Model
    if (!ast.match(/import \{[^}]*Model[^}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, Model } from 'zova';`;
      });
    }
    // Props
    ast = ast.replace(/interface [^<]*Props([^{]*) \{/, ($0) => {
      return `${$0}\n  ${modelName}?: number;`;
    });
    // Emits
    ast = ast.replace(/interface [^<]*Emits([^{]*) \{/, ($0) => {
      return `${$0}\n  (e: '${eventName}', value: number): void;`;
    });
    // propsDefault
    ast = ast.replace(/static \$propsDefault([^{]*) = \{/, ($0) => {
      return `${$0}\n  ${modelName}: 0,`;
    });
    // localName
    ast = ast.replace(/protected async __init__/, ($0) => {
      return `@Model()\n${localName}: number;\n\n    ${$0}`;
    });
    // ok
    return ast;
  },
};
