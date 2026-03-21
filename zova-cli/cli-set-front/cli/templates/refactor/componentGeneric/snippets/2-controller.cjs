const __regPropsReplace = /(interface [^<]*Props) \{/;
const __regModelsReplace = /(interface [^<]*Models) \{/;

module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  language: 'plain',
  async transform({ ast }) {
    // Props
    ast = ast.replace(__regPropsReplace, (_, $1) => {
      return `${$1}<_T = unknown> {`;
    });
    // Models
    ast = ast.replace(__regModelsReplace, (_, $1) => {
      return `${$1}<_T = unknown> {`;
    });
    // ok
    return ast;
  },
};
