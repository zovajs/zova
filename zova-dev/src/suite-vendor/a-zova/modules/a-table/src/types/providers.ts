import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeTableCellRenderComponentProvider } from 'zova-module-a-openapi';

export interface ITableProviderComponents {
  actionView?: TypeTableCellRenderComponentProvider;
  actionOperationsRow?: TypeTableCellRenderComponentProvider;
  currency?: TypeTableCellRenderComponentProvider;
  date?: TypeTableCellRenderComponentProvider;
  dateRange?: TypeTableCellRenderComponentProvider;
}

export interface ITableProvider {
  components?: ITableProviderComponents;
  actions?: IActionsRecord;
}

declare module 'zova-module-a-openapi' {
  export interface IOpenapiOptionsResourceMetaTable {
    provider?: ITableProvider;
  }
}
