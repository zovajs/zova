module.exports = {
  file: ({ argv }) => {
    return argv.controllerFileName;
  },
  parseOptions: { language: 'plain' },
  async transform({ ast }) {
    // Props
    ast = ast.replace(/(interface [^<]*Props) \{/, (_, $1) => {
      return `${$1}<T = unknown> {`;
    });
    // Emits
    ast = ast.replace(/(interface [^<]*Emits) \{/, (_, $1) => {
      return `${$1}<T = unknown> {`;
    });
    // Slots
    ast = ast.replace(/(interface [^<]*Slots) \{/, (_, $1) => {
      return `${$1}<T = unknown> {`;
    });
    // ok
    return ast;
  },
};
