import { getCoreRowModel } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerTableBase, TypeColumn, TypeTable } from 'zova-module-a-table';

export interface ControllerTableProps<T extends {} = {}> {
  columns?: TypeColumn<T>[];
  data?: T[];
  schema?: SchemaObject;
}

@Controller()
export class ControllerTable extends BeanControllerTableBase {
  static $propsDefault = {};

  table: TypeTable;

  protected async __init__() {
    // table
    this._createTable();
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      get data() {
        return self.$props.data || [];
      },
      columns: this.$props.columns as any,
      getCoreRowModel: getCoreRowModel(),
    } as any);
  }
}
