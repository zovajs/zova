module.exports = {
  file: 'openapi.config.ts',
  init: `import { ZovaOpenapiConfig } from 'zova-openapi';

export default function (): ZovaOpenapiConfig {
  return {
    default: { 
      source: 'path/to/openapi.json',
      baseURL: '',
    },
    modules: {},
  };
}
`,
  async transform({ cli, ast, argv }) {
    const moduleNames = argv._;
    for (const moduleName of moduleNames) {
      if (!ast.has(`return { modules: { '${moduleName}':{$$$0}, $$$1}, $$$2}`)) {
        const code = await cli.template.renderContent({
          content: `'${moduleName}': {}\n`,
        });
        ast.replace('return { $$$0, modules: { $$$1 } }', `return { $$$0, modules: { $$$1 , ${code} } }`);
      }
    }
    // ok
    return ast;
  },
};
