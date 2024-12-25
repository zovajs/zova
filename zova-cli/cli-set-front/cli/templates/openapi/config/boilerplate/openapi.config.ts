import { createConfig } from '@redocly/openapi-core';

export default function () {
  return createConfig(
    {
      apis: {
        default: { root: 'path/to/api.json' },
      },
    },
    { extends: ['recommended'] },
  );
}
