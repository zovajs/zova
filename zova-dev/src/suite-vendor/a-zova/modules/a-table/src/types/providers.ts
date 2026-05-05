import type { TypeTableCellRenderComponentProvider, TypeTableBulkRenderComponentProvider, IPerformActionProviderRecord } from 'zova-module-a-openapi';

export interface ITableProviderComponents {
  ActionOperationsBulk?: TypeTableBulkRenderComponentProvider;
  ActionCreate?: TypeTableBulkRenderComponentProvider;
  ActionOperationsRow?: TypeTableCellRenderComponentProvider;
  ActionView?: TypeTableCellRenderComponentProvider;
  ActionUpdate?: TypeTableCellRenderComponentProvider;
  ActionDelete?: TypeTableCellRenderComponentProvider;
  Currency?: TypeTableCellRenderComponentProvider;
  Date?: TypeTableCellRenderComponentProvider;
  DateRange?: TypeTableCellRenderComponentProvider;
  Toggle?: TypeTableCellRenderComponentProvider;
  Select?: TypeTableCellRenderComponentProvider;
  Textarea?: TypeTableCellRenderComponentProvider;
  ResourcePicker?: TypeTableCellRenderComponentProvider;
}

export interface ITableProvider {
  components?: ITableProviderComponents;
  actions?: IPerformActionProviderRecord;
}

declare module 'zova-module-a-openapi' {
  export interface IOpenapiOptionsResourceMetaTable {
    provider?: ITableProvider;
  }
}
