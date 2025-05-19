import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { cast, Functionable, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerTableBase, TableFeatureSchema, TypeColumn, TypeTable } from 'zova-module-a-table';

export interface ControllerWrapperTableProps<_T extends {} = {}> {
  onActionCreate: Functionable;
}

@Controller()
export class ControllerWrapperTable<T extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  table: TypeTable<T>;
  columns: TypeColumn<T>[];

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    // dataFindAll
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    await queryDataFindAll.suspense();
    // columns
    this._createColumns();
    // table
    this._createTable();
  }

  get data() {
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return queryDataFindAll.data;
  }

  get schema() {
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    return this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data?.operationObject);
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.schema) return [];
      const columnHelper = createColumnHelper();
      const columns: TypeColumn[] = [];
      const properties = this.schema.properties!;
      for (const key in properties) {
        columns.push(columnHelper.accessor(key as any, {
          id: key,
          header: props => {
            return props.header.property?.description || key;
          },
          cell: props => props.getValue(),
        }));
      }
      return columns as TypeColumn<T>[];
    });
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      _features: [TableFeatureSchema],
      get schema() { return self.schema; },
      get data() { return self.data || []; },
      get columns() { return self.columns; },
      getRowId: row => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
    });
  }

  onActionCreate() {
    return this.$props.onActionCreate();
  }
}
