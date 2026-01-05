import { celEnvBase } from '@cabloy/utils';
import { createColumnHelper, getCoreRowModel, Row, TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { cast, deepEqual, Use } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, renderFieldTopPropsSystem, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase } from '../../lib/beanControllerTableBase.js';
import { BeanTableFeatureBase } from '../../lib/beanTableFeatureBase.js';
import { ServiceTableFeature } from '../../service/tableFeature.js';
import { TypeColumn, TypeTable } from '../../types/table.js';
import { constColumnProps, TypeTableCellRender } from '../../types/tableColumn.js';

export interface ControllerTableProps<TData extends {} = {}> {
  data?: TData[];
  schema?: SchemaObject;
  tableProvider?: ITableProvider;
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
  zovaJsx: ZovaJsx;
  columnCelEnv: typeof celEnvBase;

  @Use()
  $$serviceTableFeature: ServiceTableFeature;

  protected async __init__() {
    this.bean._setBean('$$table', this);
    // properties
    this._createProperties();
    // tableMeta
    await this._createTableMeta();
    // watch
    this.$watch(() => this.$props.schema, async (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      await this._createTableMeta();
    });
    // columns
    this._createColumns();
    // features
    await this._createFeatures();
    // table
    this._createTable();
    // jsx
    this.columnCelEnv = this._getColumnCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(
      ZovaJsx,
      false,
      this.tableProvider.components,
      this.columnCelEnv,
    );
  }

  get schema() {
    return this.$props.schema;
  }

  get data() {
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

  private async _createTableMeta() {
    const properties: SchemaObject[] = [];
    const renders: TypeTableCellRender[] = [];
    if (this.properties) {
      for (const property of this.properties) {
        const key = property.key!;
        // celScope
        const celScope = this.getCellScope(key);
        // props
        const props = this.getFieldComponentPropsTop(key, celScope);
        if (cast(props).visible === false) return;
      }
    }
  }

  private async _createFeatures() {
    this.features = await this.$$serviceTableFeature.loadTableFeatures();
  }

  public getCellProperty(name: string): SchemaObject | undefined {
    if (!this.properties) return;
    return this.properties.find(item => item.key === name);
  }

  public getCellScope(name: string, scopeExtra?: {}) {
    return {
      name,
      property: this.getCellProperty(name),
      ...scopeExtra,
    };
  }

  public getFieldComponentPropsTop(name: string, celScope: {}): IFormFieldRenderContextOptions {
    const props: any = { [constColumnProps]: true, key: name, name };
    const property = this.getCellProperty(name);
    if (!property) return props;
    const rest = property.rest;
    if (!rest) return props;
    const keys = Object.keys(rest).filter(item => !renderFieldTopPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      const value = rest[key];
      let keyValue;
      if (key === 'render') {
        if (typeof value === 'string') {
          keyValue = this.zovaJsx.evaluateExpression(value, celScope);
        } else {
          keyValue = value;
        }
      } else {
        keyValue = this.zovaJsx.renderJsxOrCel(value, undefined, celScope);
      }
      props[key] = keyValue;
    }
    return props;
  }
}
