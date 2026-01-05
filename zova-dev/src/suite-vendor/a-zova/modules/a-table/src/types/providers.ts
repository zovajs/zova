import type { TypeTableCellRenderComponentProvider } from 'zova-module-a-openapi';

export interface ITableProviderComponents {
  currency?: TypeTableCellRenderComponentProvider;
}

export interface ITableProvider {
  components?: ITableProviderComponents;
}

declare module 'zova-module-a-openapi' {
  export interface IOpenApiOptionsRestResourceTable {
    provider?: ITableProvider;
  }
}
