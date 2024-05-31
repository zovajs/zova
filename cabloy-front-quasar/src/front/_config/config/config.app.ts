// npm run build
// npm run build -- --flavor=app
import { CabloyConfigMeta, CabloyConfigOptional } from '@cabloy/front';

export default function (_meta: CabloyConfigMeta) {
  const config = {
    base: {
      jwt: true,
    },
  } as CabloyConfigOptional;

  // module config
  config.modules = {};

  return config;
}
