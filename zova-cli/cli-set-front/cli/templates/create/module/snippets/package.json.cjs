module.exports = {
  file: 'package.json',
  language: 'json',
  async transform({ /* cli, */ ast, argv }) {
    ast.dependencies[`zova-module-${argv.name}`] = '^5.0.0';
    // ok
    return ast;
  },
};
