import type { CellContext, RowData } from '@tanstack/table-core';
import type { SchemaObject } from 'openapi3-ts/oas31';
import type { IJsxRenderContextBase, TypeTableCellRenderComponent } from 'zova-module-a-openapi';

import type { ControllerTable } from '../component/table/controller.jsx';

export const constColumnProps = '$$ColumnProps';

export type TypeTableCellRender<TData extends RowData = RowData, TValue = any> = (props?: CellContext<TData, TValue>) => any;

export interface IJsxRenderContextTableColumn<TData extends {} = any> extends IJsxRenderContextBase {
  $celScope: ITableColumnScope;
  $$table: ControllerTable<TData>;
}

export interface ITableCellRenderColumnProps {
  key: string;
  name: string;
  visible?: boolean;
  render: TypeTableCellRenderComponent;
}

export interface ITableScope {}

export interface ITableColumnScope extends ITableScope {
  name: string;
  property?: SchemaObject;
}

export interface ITableCellScope extends ITableColumnScope {
  value: any;
}
