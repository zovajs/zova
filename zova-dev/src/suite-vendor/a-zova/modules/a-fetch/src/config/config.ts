import type { CreateAxiosDefaults } from 'axios';
import type { ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    axios: {
      config: {} as CreateAxiosDefaults,
    },
  };
};
