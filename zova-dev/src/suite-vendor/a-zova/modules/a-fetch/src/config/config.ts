import { CreateAxiosDefaults } from 'axios';
import { ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    axios: {
      config: {} as CreateAxiosDefaults,
    },
  };
};
