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
  async transform({ cli: _cli, ast }) {
    // ok
    return ast;
  },
};
