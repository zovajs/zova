module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  language: 'plain',
  async transform({ ast }) {
    // Props
    ast = ast.replace(/(interface [^<]*Props) \{/, (_, $1) => {
      return `${$1}<_T = unknown> {`;
    });
    // Models
    ast = ast.replace(/(interface [^<]*Models) \{/, (_, $1) => {
      return `${$1}<_T = unknown> {`;
    });
    // ok
    return ast;
  },
};
