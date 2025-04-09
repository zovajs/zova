module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  language: 'plain',
  async transform({ cli, ast, argv }) {
    const modelName = argv.modelName;
    const localName = modelName === 'modelValue' ? modelName : `model${cli.helper.firstCharToUpperCase(modelName)}`;
    const typeName = modelName === 'modelValue' ? 'vModel' : `vModel:${modelName}`;
    // models
    if (!ast.includes(`${argv.controllerClassName}Models`)) {
      const matchGeneric = ast.match(/interface [^<]*Props<(.*?)> \{/);
      const hasGeneric = !!matchGeneric;
      const generic = matchGeneric && matchGeneric[1];
      const genericT = hasGeneric ? `<${generic}>` : '';
      ast = ast.replace('@Controller', `export interface ${argv.controllerClassName}Models${genericT} {}\n\n@Controller`);
    }
    // exits
    if (ast.includes(`'${typeName}'`)) {
      throw new Error('Model exists');
    }
    // Model
    ast = ast.replace(/interface [^<]*Models([^{]*) \{/, ($0) => {
      return `${$0}\n  '${typeName}'?: number;`;
    });
    // @Model
    if (!ast.match(/import \{[^}]*Model[^}]*\} from 'zova';/)) {
      ast = ast.replace(/import \{ ([^}]*) \} from 'zova';/, (_, $1) => {
        return `import { ${$1}, Model } from 'zova';`;
      });
    }
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
