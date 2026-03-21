import { defineConfig } from 'oxfmt';
import { oxcFormatConfig } from '@cabloy/lint';

export default defineConfig(oxcFormatConfig({
  ignorePatterns: [
    '*.min.js',
    '*.code-snippets',
    '**/dist/**',
    '**/static/**',
    '**/.rollup.cache/**',
    '**/.metadata/index.ts',
    '.vona',
    '.assets',
    'coverage',
    'docker-compose',
    'scripts',
    'zovaRest',
    'assets',
    'vite.config.ts.timestamp-*',
    'dist-releases',
    'dist-mock',
    'src-capacitor',
    'src-cordova',
    '.zova',
  ],
}));
