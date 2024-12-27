const __snippet_declare = "import <%=argv.nameMeta.fullCapitalize%> from './page/<%=argv.pageName%>/index.vue';\n";
const __snippet_body =
  '{ path: \'<%=argv.moduleInfo.name!==argv.pageName?argv.pageName:""%>\', component: <%=argv.nameMeta.fullCapitalize%> },';

module.exports = {
  file: 'openapi.config.ts',
  init: `import { ZovaOpenapiConfig } from 'zova-openapi';

export default function (): ZovaOpenapiConfig {
  return {
    modules: {},
  };
}
`,
  async transform({ cli: cli, ast, argv }) {
    const moduleNames = argv._;
    for (const moduleName of moduleNames) {
      if (!ast.has(`return { modules: { '${moduleName}':{$$$0}, $$$1} }`)) {
        const code = await cli.template.renderContent({
          content: `'${moduleName}': { source: 'path/to/openapi.json' }\n`,
        });
        ast.replace('return { modules: { $$$0 } }', `return { modules: { $$$0 ,\n ${code} } }`);
      }
    }
    // ok
    return ast;
  },
};
