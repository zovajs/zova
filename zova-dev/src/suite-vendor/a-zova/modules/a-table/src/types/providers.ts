import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeTableCellRenderComponentProvider, TypeTableBulkRenderComponentProvider } from 'zova-module-a-openapi';

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
  actions?: IActionsRecord;
}

declare module 'zova-module-a-openapi' {
  export interface IOpenapiOptionsResourceMetaTable {
    provider?: ITableProvider;
  }
}
