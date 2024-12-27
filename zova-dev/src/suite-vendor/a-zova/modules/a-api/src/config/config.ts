import { IBeanScopeRecord, TypeBeanRecordSelectorSpecificNameKeys, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultBeanApi: 'home-api.bean.api' as TypeBeanRecordSelectorSpecificNameKeys<'bean', 'api'>,
    defaultModuleServices: 'home-api' as keyof IBeanScopeRecord,
  };
};
