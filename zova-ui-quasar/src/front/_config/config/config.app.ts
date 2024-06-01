// npm run build
// npm run build -- --flavor=app
import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config = {
    base: {
      jwt: true,
    },
  } as ZovaConfigOptional;

  // module config
  config.modules = {};

  return config;
}
