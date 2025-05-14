import { createColumnHelper, getCoreRowModel } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { Functionable } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerTableBase, TypeColumn, TypeTable } from 'zova-module-a-table';

export interface ControllerRestTableProps<T extends any[] = any[]> {
  data?: T;
  schema?: SchemaObject;
  onOperationCreate: Functionable;
}

@Controller()
export class ControllerRestTable extends BeanControllerTableBase {
  static $propsDefault = {};

  table: TypeTable;
  columns: TypeColumn[];

  protected async __init__() {
    // columns
    this._createColumns();
    // table
    this._createTable();
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.$props.schema) return [];
      const columnHelper = createColumnHelper();
      const columns: TypeColumn[] = [];
      const properties = this.$props.schema.properties!;
      for (const key in properties) {
        // const property = schema.properties[key];
        columns.push(columnHelper.accessor(key as any, {
          id: key,
          cell: info => info.getValue(),
        }));
      }
      return columns;
    });
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      get data() {
        return self.$props.data || [];
      },
      columns: this.columns as any,
      getCoreRowModel: getCoreRowModel(),
    } as any);
  }

  onOperationCreate() {
    return this.$props.onOperationCreate();
  }
}
