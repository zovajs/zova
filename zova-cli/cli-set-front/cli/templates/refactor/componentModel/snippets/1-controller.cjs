module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  parseOptions: { language: 'plain' },
  async transform({ cli, ast, argv }) {
    const modelName = argv.modelName;
    const localName = modelName === 'modelValue' ? modelName : `model${cli.helper.firstCharToUpperCase(modelName)}`;
    const eventName = `update:${modelName}`;
    if (ast.includes(`e: '${eventName}'`)) throw new Error('Model exists');
    // Props
    ast = ast.replace(/interface [^<]*Props([^\{]*) \{/, $0 => {
      return `${$0}\n  ${modelName}?: number;`;
    });
    // Emits
    ast = ast.replace(/interface [^<]*Emits([^\{]*) \{/, $0 => {
      return `${$0}\n  (e: '${eventName}', value: number): void;`;
    });
    // propsDefault
    ast = ast.replace(/static \$propsDefault([^\{]*) = \{/, $0 => {
      return `${$0}\n  ${modelName}: 0,`;
    });
    // localName
    ast = ast.replace(/protected async __init__/, $0 => {
      return `${localName}: number;\n\n    ${$0}`;
    });
    ast = ast.replace(/protected async __init__([^\{]*) \{/, $0 => {
      return `${$0}\n      this.${localName} = this.$useModel(${modelName === 'modelValue' ? '' : `'${modelName}'`});`;
    });
    // ok
    return ast;
  },
};
