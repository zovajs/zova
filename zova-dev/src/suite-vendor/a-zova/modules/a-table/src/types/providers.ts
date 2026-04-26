import type { IActionsRecord } from 'zova-module-a-action';
import type {
  TypeTableCellRenderComponentProvider,
  TypeTableRenderComponentProvider,
} from 'zova-module-a-openapi';

export interface ITableProviderComponents {
  actionOperationsTable?: TypeTableRenderComponentProvider;
  actionOperationsRow?: TypeTableCellRenderComponentProvider;
  actionView?: TypeTableCellRenderComponentProvider;
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
