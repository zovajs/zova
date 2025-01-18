module.exports = {
  file: 'package.json',
  language: 'json',
  async transform({ /* cli,*/ ast, argv }) {
    ast.dependencies[`zova-module-${argv.name}`] = 'workspace:^';
    // ok
    return ast;
  },
};
