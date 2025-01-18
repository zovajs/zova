module.exports = {
  file: 'style.ts',
  language: 'plain',
  async transform({ ast, argv }) {
    const res = ast.match(/import {.*? Use[ ,].*?} from 'zova';/);
    if (!res) {
      ast = ast.replace(" } from 'zova';", ", Use } from 'zova';");
    }
    ast = ast
      .replace(
        "from 'zova-module-a-bean';",
        `from 'zova-module-a-bean';\nimport { ${argv.styleClassName} } from './style.${argv.styleName}.js';`,
      )
      .replace(
        'extends BeanStyleBase {',
        `extends BeanStyleBase {\n  @Use()\n  $$$$style${argv.styleNameCapitalize}: ${argv.styleClassName};\n`,
      );
    // ok
    return ast;
  },
};
