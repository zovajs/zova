import { celEnvBase } from '@cabloy/utils';
import { createColumnHelper, getCoreRowModel, Row, TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { appResource, cast, deepEqual, deepExtend, Use, UseScope } from 'zova';
import { isJsxComponent, ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, renderTableColumnTopPropsSystem, ScopeModuleAOpenapi, TypeResourceActionRowRecord, TypeResourceActionTableRecord, TypeTableCellRenderComponent, TypeTableCellRenderComponentProvider } from 'zova-module-a-openapi';
import { BeanControllerTableBase } from '../../lib/beanControllerTableBase.js';
import { BeanTableFeatureBase } from '../../lib/beanTableFeatureBase.js';
import { ServiceTableFeature } from '../../service/tableFeature.js';
import { ITableProvider } from '../../types/providers.js';
import { ITableMeta, TypeColumn, TypeTable } from '../../types/table.js';
import { IDecoratorTableCellOptions, ITableCellRender } from '../../types/tableCell.js';
import { constColumnProps, ITableCellRenderColumnProps, TypeTableCellRender } from '../../types/tableColumn.js';

export interface ControllerTableProps<TData extends {} = {}> {
  data?: TData[];
  schema?: SchemaObject;
  tableProvider?: ITableProvider;
  getColumnsLeft?: (table: ControllerTable<TData>) => (TypeColumn<TData>[] | undefined);
  getColumnsRight?: (table: ControllerTable<TData>) => (TypeColumn<TData>[] | undefined);
  onActionTable?: (action: keyof TypeResourceActionTableRecord, table: ControllerTable<TData>) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>, table: ControllerTable<TData>) => Promise<any> | undefined;
  slotDefault?: (table: ControllerTable<TData>) => VNode;
}

@Controller()
export class ControllerTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  properties: SchemaObject[] | undefined;
  columns: TypeColumn<TData>[];
  features: BeanTableFeatureBase[] | undefined;
  table: TypeTable<TData>;
  tableProvider: ITableProvider;
  tableMeta: ITableMeta<TData>;
  zovaJsx: ZovaJsx;
  columnCelEnv: typeof celEnvBase;

  @Use()
  $$serviceTableFeature: ServiceTableFeature;

  @UseScope()
  $$scopeModuleAOpenapi: ScopeModuleAOpenapi;

  protected async __init__() {
    this.bean._setBean('$$table', this);
    this.tableProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.restResource.table?.provider, this.$props.tableProvider);
    });
    // jsx
    this.columnCelEnv = this._getColumnCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(
      ZovaJsx,
      false,
      this.tableProvider.components,
      this.columnCelEnv,
    );
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
            return self.$props.onActionTable?.(action, self);
          },
          onActionRow: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => {
            return self.$props.onActionRow?.(action, row, self);
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
      const columnsLeft = this.$props.getColumnsLeft?.(this);
      const columnsRight = this.$props.getColumnsRight?.(this);
      const columnsMiddle = this._createColumnsMiddle();
      let columns: TypeColumn<TData>[] = [];
      if (columnsLeft) columns = columns.concat(columnsLeft);
      if (columnsMiddle) columns = columns.concat(columnsMiddle);
      if (columnsRight) columns = columns.concat(columnsRight);
      return columns;
    });
  }

  private _createColumnsMiddle() {
    const columnHelper = createColumnHelper<TData>();
    const columns: TypeColumn<TData>[] = [];
    for (const property of this.tableMeta.properties) {
      const key = property.key!;
      columns.push(columnHelper.accessor(key as any, {
        id: key,
        header: props => {
          return props.header.property?.title || key;
        },
        cell: props => this.tableMeta.renders[key](props),
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
    const renders: Record<string, TypeTableCellRender<TData>> = {};
    if (this.properties) {
      for (const property of this.properties) {
        const key = property.key!;
        // columnScope
        const columnScope = this.getColumnScope(key);
        // columnProps
        const columnProps = this.getColumnComponentPropsTop(key, columnScope);
        // visible
        if (columnProps.visible === false) continue;
        // property
        properties.push(property);
        // render
        renders[key] = await this._createColumnRender(property, columnProps, columnScope);
      }
    }
    this.tableMeta = { properties, renders };
  }

  private async _createColumnRender(
    property: SchemaObject,
    columnProps: ITableCellRenderColumnProps,
    columnScope: any,
  ): Promise<TypeTableCellRender<TData, any>> {
    // renderProvider
    const renderProvider = this.getRenderProvider(columnProps.render);
    // beanInstance
    let beanInstance: ITableCellRender | undefined;
    let onionOptions: IDecoratorTableCellOptions | undefined;
    if (typeof renderProvider === 'string' && renderProvider.includes('.tableCell.')) {
      const beanOptions = appResource.getBean(renderProvider as any);
      onionOptions = beanOptions?.options as IDecoratorTableCellOptions | undefined;
      beanInstance = await this.sys.bean._getBean(renderProvider as any, true);
    }
    return cellContext => {
      if (!cellContext) return;
      // value
      const value = cellContext.getValue();
      // cellScope
      const cellScope: any = Object.assign({}, columnScope, { value });
      // displayValue
      let displayValue = property.rest?.displayValue !== undefined
        ? this.zovaJsx.evaluateExpression(property.rest?.displayValue, cellScope)
        : value;
      if (displayValue === undefined || displayValue === null || displayValue === '') {
        displayValue = this.table.options.renderFallbackValue;
      }
      cellScope.displayValue = displayValue;
      // render: text
      if (renderProvider === 'text') {
        return displayValue;
      }
      // beanInstance
      if (beanInstance) {
        // jsx: props
        let cellProps = isJsxComponent(columnProps.render)
          ? this.zovaJsx.renderJsxProps(cast(columnProps.render).props, { ...columnProps }, cellScope)
          : columnProps;
        if (onionOptions) {
          cellProps = deepExtend({}, onionOptions, cellProps);
        }
        const cellRenderContext = {
          cellScope,
          cellContext,
          $$table: this,
        };
        return beanInstance.render(cellRenderContext, cellProps, () => {
          const children = isJsxComponent(columnProps.render) && cast(columnProps.render).children;
          if (children && children.length > 0) {
            return this.zovaJsx.renderJsxChildrenDirect(children, cellScope);
          } else {
            return displayValue;
          }
        });
      }
      // general component
      return this.zovaJsx.render(columnProps.render, {}, cellScope);
    };
  }

  private async _createFeatures() {
    this.features = await this.$$serviceTableFeature.loadTableFeatures();
  }

  public getColumnProperty(name: string): SchemaObject | undefined {
    if (!this.properties) return;
    return this.properties.find(item => item.key === name);
  }

  private _getColumnCelEnv(): typeof celEnvBase {
    const celEnv = celEnvBase.clone();
    celEnv.registerFunction('getProperty(string):dyn', name => {
      return this.getColumnProperty(name);
    });
    return celEnv;
  }

  public getColumnScope(name: string, scopeExtra?: {}) {
    return {
      name,
      property: this.getColumnProperty(name),
      ...scopeExtra,
    };
  }

  public getColumnComponentPropsTop(name: string, celScope: {}): ITableCellRenderColumnProps {
    const props: any = { [constColumnProps]: true, key: name, name };
    const property = this.getColumnProperty(name);
    if (!property) return props;
    const rest = property.rest;
    if (!rest) return props;
    const keys = Object.keys(rest).filter(item => !renderTableColumnTopPropsSystem.includes(item));
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

  public getRenderFlattern(render: TypeTableCellRenderComponent): TypeTableCellRenderComponent {
    return isJsxComponent(render) ? cast(render).type : render;
  }

  public getRenderProvider(render: TypeTableCellRenderComponent): TypeTableCellRenderComponentProvider {
    let renderProvider = this.getRenderFlattern(render);
    if (typeof renderProvider === 'string') {
      renderProvider = this.tableProvider.components?.[renderProvider] ?? renderProvider;
    }
    return (renderProvider ?? 'text') as TypeTableCellRenderComponentProvider;
  }
}
