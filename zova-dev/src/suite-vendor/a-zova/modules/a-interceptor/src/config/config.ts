import { ZovaApplication } from 'zova';
import { IServiceRecord } from 'zova-module-a-bean';

export const config = (_app: ZovaApplication) => {
  return {
    jwtAdapter: 'home-api:jwtAdapter' as keyof IServiceRecord,
  };
};
