module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  language: 'plain',
  async transform({ ast, argv }) {
    if (ast.includes(`${argv.controllerClassName}Slots`))
      throw new Error('Slots exists');
    const matchGeneric = ast.match(/interface [^<]*Props<(.*?)> \{/);
    const hasGeneric = !!matchGeneric;
    const genericT = hasGeneric ? '<T = unknown>' : '';
    // Slots
    ast = ast.replace('@Controller', `export interface ${argv.controllerClassName}Slots${genericT} {}\n\n@Controller`);
    // ok
    return ast;
  },
};
