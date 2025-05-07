import type { ZovaOpenapiConfig } from 'zova-openapi';

export default function (): ZovaOpenapiConfig {
  return {
    default: {
      source: 'path/to/openapi.json',
    },
    modules: {},
  };
}
