import { Row, RowData, Table } from '@tanstack/table-core';
import { BeanTableFeatureBase, IDecoratorTableFeatureOptions, ITableActionHandler, ITableActionHandlerRow, ITableActionHandlerTable, TableFeature } from 'zova-module-a-table';

export interface TableFeatureActionsOptions<TData extends RowData> {
  actions?: ITableActionHandler<TData>;
}

export interface TableFeatureActionsInstance<TData extends RowData> {
  actions?: ITableActionHandlerTable<TData>;
}

export interface TableFeatureActionsRow<TData extends RowData> {
  actions?: ITableActionHandlerRow<TData>;
}

export interface TableFeatureActionsColumn<_TData extends RowData, _TValue> {}

export interface TableFeatureActionsHeader<_TData extends RowData, _TValue> {}

export interface TableFeatureActionsCell<_TData extends RowData, _TValue> {}

declare module '@tanstack/vue-table' {

  export interface TableOptionsResolved<TData extends RowData>
    extends TableFeatureActionsOptions<TData> {}

  export interface Table<TData extends RowData> extends TableFeatureActionsInstance<TData> {}

  export interface Row<TData extends RowData> extends TableFeatureActionsRow<TData> {}

  export interface Column<TData extends RowData, TValue> extends TableFeatureActionsColumn<TData, TValue> {}

  export interface Header<TData extends RowData, TValue> extends TableFeatureActionsHeader<TData, TValue> {}

  export interface Cell<TData extends RowData, TValue> extends TableFeatureActionsCell<TData, TValue> {}
}

export interface ITableFeatureOptionsActions extends IDecoratorTableFeatureOptions {}

@TableFeature<ITableFeatureOptionsActions>()
export class TableFeatureActions extends BeanTableFeatureBase {
  getDefaultOptions<TData extends RowData>(_table: Table<TData>): TableFeatureActionsOptions<TData> {
    return {
      actions: undefined,
    } as TableFeatureActionsOptions<TData>;
  }

  createTable<TData extends RowData>(table: Table<TData>): void {
    Object.defineProperty(table, 'actions', {
      get() {
        return {
          create: () => {
            table.options.actions?.onActionTable?.('create');
          },
        };
      },
    });
  }

  createRow<TData extends RowData>(row: Row<TData>, table: Table<TData>): void {
    Object.defineProperty(row, 'actions', {
      get() {
        return {
          view: () => {
            table.options.actions?.onActionRow?.('view', row);
          },
          update: () => {
            table.options.actions?.onActionRow?.('update', row);
          },
          delete: () => {
            table.options.actions?.onActionRow?.('delete', row);
          },
        };
      },
    });
  }
}
