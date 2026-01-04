import { createColumnHelper, getCoreRowModel, Row, TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase } from '../../lib/beanControllerTableBase.js';
import { BeanTableFeatureBase } from '../../lib/beanTableFeatureBase.js';
import { ServiceTableFeature } from '../../service/tableFeature.js';
import { TypeColumn, TypeTable, TypeTableOptions } from '../../types/table.js';

export interface ControllerTableProps<TData extends {} = {}> {
  data?: TData[];
  schema?: SchemaObject;
  getColumnsLeft?: () => (TypeColumn<TData>[] | undefined);
  getColumnsRight?: () => (TypeColumn<TData>[] | undefined);
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => Promise<any> | undefined;
  slotDefault?: (table: ControllerTable<TData>) => VNode;
}

@Controller()
export class ControllerTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  properties: SchemaObject[] | undefined;
  columns: TypeColumn<TData>[];
  features: BeanTableFeatureBase[] | undefined;
  table: TypeTable<TData>;

  @Use()
  $$serviceTableFeature: ServiceTableFeature;

  protected async __init__() {
    this.bean._setBean('$$table', this);
    // properties
    this._createProperties();
    // columns
    this._createColumns();
    // features
    await this._createFeatures();
    // table
    this._createTable();
  }

  get schema() {
    return this.$props.schema;
  }

  get data(){
    return this.$props.data;
  }

  private _createTable() {
    const self = this;
    const tableOptions: TableOptionsWithReactiveData<TData> = {
      _features: this.features,
      getRowId: (row: TData) => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: this.scope.config.renderFallbackValue,
      manualPagination: true,
      get actions() {
        return {
          onActionTable: (action: keyof TypeResourceActionTableRecord) => {
            return self.$props.onActionTable?.(action);
          },
          onActionRow: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => {
            return self.$props.onActionRow?.(action, row);
          },
        };
      },
      get schema() { return self.schema; },
      get data() { return self.data || []; },
      get columns() { return self.columns; },
    };
    this.table = this.$useTable(tableOptions);
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.properties) return [];
      const columnsLeft = this.$props.getColumnsLeft?.();
      const columnsRight = this.$props.getColumnsRight?.();
      const columnsMiddle = this._createColumnsMiddle();
      let columns: TypeColumn<TData>[] = [];
      if (columnsLeft) columns = columns.concat(columnsLeft);
      if (columnsMiddle) columns = columns.concat(columnsMiddle);
      if (columnsRight) columns = columns.concat(columnsRight);
      return columns;
    });
  }

  private _createColumnsMiddle() {
    if (!this.properties) return;
    const columnHelper = createColumnHelper<TData>();
    const columns: TypeColumn<TData>[] = [];
    for (const property of this.properties) {
      const key = property.key!;
      columns.push(columnHelper.accessor(key as any, {
        id: key,
        header: props => {
          return props.header.property?.title || key;
        },
        cell: props => props.cell.formatRender(),
      }));
    }
    return columns;
  }

  private _createProperties() {
    this.properties = this.$useComputed(() => {
      return loadSchemaProperties(this.schema, 'table');
    });
  }

  private async _createFeatures() {
    this.features = await this.$$serviceTableFeature.loadTableFeatures();
  }
}
