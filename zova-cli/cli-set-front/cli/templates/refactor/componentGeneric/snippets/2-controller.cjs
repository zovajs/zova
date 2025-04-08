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
    // Emits
    ast = ast.replace(/(interface [^<]*Emits) \{/, (_, $1) => {
      return `${$1}<_T = unknown> {`;
    });
    // Slots
    ast = ast.replace(/(interface [^<]*Slots) \{/, (_, $1) => {
      return `${$1}<_T = unknown> {`;
    });
    // ok
    return ast;
  },
};
