module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  language: 'plain',
  async transform({ ast, argv }) {
    if (ast.includes(`${argv.controllerClassName}Emits`))
      throw new Error('Emits exists');
    const matchGeneric = ast.match(/interface [^<]*Props<(.*?)> \{/);
    const hasGeneric = !!matchGeneric;
    const genericT = hasGeneric ? '<T = unknown>' : '';
    // Emits
    ast = ast.replace('@Controller', `export interface ${argv.controllerClassName}Emits${genericT} {}\n\n@Controller`);
    // ok
    return ast;
  },
};
