import { IBeanScopeRecord, TypeBeanRecordGeneralSelectorSpecificNameKeys, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultBeanFetch: 'home-api.bean.fetch' as TypeBeanRecordGeneralSelectorSpecificNameKeys<'bean', 'fetch'>,
    defaultModuleApi: 'home-api' as keyof IBeanScopeRecord,
  };
};
