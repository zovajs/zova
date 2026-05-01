import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeTableCellRenderComponentProvider, TypeTableBulkRenderComponentProvider } from 'zova-module-a-openapi';

export interface ITableProviderComponents {
  ActionOperationsBulk?: TypeTableBulkRenderComponentProvider;
  ActionCreate?: TypeTableBulkRenderComponentProvider;
  actionOperationsRow?: TypeTableCellRenderComponentProvider;
  actionView?: TypeTableCellRenderComponentProvider;
  actionUpdate?: TypeTableCellRenderComponentProvider;
  actionDelete?: TypeTableCellRenderComponentProvider;
  currency?: TypeTableCellRenderComponentProvider;
  date?: TypeTableCellRenderComponentProvider;
  dateRange?: TypeTableCellRenderComponentProvider;
  toggle?: TypeTableCellRenderComponentProvider;
  select?: TypeTableCellRenderComponentProvider;
  textarea?: TypeTableCellRenderComponentProvider;
  resourcePicker?: TypeTableCellRenderComponentProvider;
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
