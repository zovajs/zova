import { getCoreRowModel } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { cast } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerTableBase, TableFeatureSchema, TypeColumn, TypeTable } from 'zova-module-a-table';

export interface ControllerTableProps<T extends {} = {}> {
  columns?: TypeColumn<T>[];
  data?: T[];
  schema?: SchemaObject;
}

@Controller()
export class ControllerTable<T extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  table: TypeTable<T>;

  protected async __init__() {
    this.bean._setBean('$$table', this);
    // table
    this._createTable();
  }

  public get schema() {
    return this.$props.schema!;
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      _features: [TableFeatureSchema],
      schema: this.schema,
      get data() {
        return self.$props.data || [];
      },
      columns: this.$props.columns as any,
      getRowId: row => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
    });
  }
}
