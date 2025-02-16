import EslintConfig from '@cabloy/lint/front/eslint.js';

export default EslintConfig({
  ignores: [
    '**/*.d.ts',
    '**/node_modules/**',
    '**/dist/**',
    '**/static/**',
    'vite.config.ts.timestamp-*',
    'distMockServer',
    'src-capacitor',
    'src-cordova',
    'package.json',
    '.quasar',
    '.zova',
    '.assets',
  ],
});
