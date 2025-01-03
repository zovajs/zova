import { IBeanScopeRecord, TypeBeanRecordGeneralSelectorSpecificNameKeys, ZovaApplication } from 'zova';

export const config = (_app: ZovaApplication) => {
  return {
    defaultBeanApi: 'home-api.bean.api' as TypeBeanRecordGeneralSelectorSpecificNameKeys<'bean', 'api'>,
    defaultModuleServices: 'home-api' as keyof IBeanScopeRecord,
  };
};
