import { IBeanScopeRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultModuleApi: 'home-api' as keyof IBeanScopeRecord,
  };
};
