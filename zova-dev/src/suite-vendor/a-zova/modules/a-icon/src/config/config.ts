import type { IBeanScopeRecord, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultModule: 'home-icon' as keyof IBeanScopeRecord,
  };
};
