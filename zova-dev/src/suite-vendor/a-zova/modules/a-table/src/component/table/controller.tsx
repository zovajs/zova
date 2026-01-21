import { celEnvBase } from '@cabloy/utils';
import { CellContext, createColumnHelper, getCoreRowModel, Row, TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { appResource, cast, deepEqual, deepExtend, UseScope } from 'zova';
import { isJsxComponent, ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, renderTableColumnTopPropsSystem, ScopeModuleAOpenapi, TypeResourceActionRowRecord, TypeResourceActionTableRecord, TypeTableCellRenderComponent, TypeTableCellRenderComponentProvider } from 'zova-module-a-openapi';
import { BeanControllerTableBase } from '../../lib/beanControllerTableBase.js';
import { ITableProvider } from '../../types/providers.js';
import { ITableMeta, TypeColumn, TypeTable, TypeTableGetColumnsNext } from '../../types/table.js';
import { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender } from '../../types/tableCell.js';
import { constColumnProps, ITableCellCelScope, ITableCellRenderColumnProps, ITableCelScope, ITableColumnCelScope, TypeTableCellRender } from '../../types/tableColumn.js';

export interface ControllerTableProps<TData extends {} = {}> {
  data?: TData[];
  schema?: SchemaObject;
  tableProvider?: ITableProvider;
  tableScope?: ITableCelScope;
  getColumns?: (next: TypeTableGetColumnsNext<TData>, table: ControllerTable<TData>,) => (TypeColumn<TData>[]);
  onActionTable?: (action: keyof TypeResourceActionTableRecord, table: ControllerTable<TData>) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>, table: ControllerTable<TData>) => Promise<any> | undefined;
  slotDefault?: (table: ControllerTable<TData>) => VNode;
}

@Controller()
export class ControllerTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  properties: SchemaObject[] | undefined;
  columns: TypeColumn<TData>[];
  table: TypeTable<TData>;
  tableProvider: ITableProvider;
  tableMeta: ITableMeta<TData>;
  zovaJsx: ZovaJsx;
  columnCelEnv: typeof celEnvBase;

  @UseScope()
  $$scopeModuleAOpenapi: ScopeModuleAOpenapi;

  protected async __init__() {
    this.bean._setBean('$$table', this);
    this.tableProvider = this.$useComputed(() => {
      return deepExtend(
        {},
        this.$$scopeModuleAOpenapi.config.restResource.provider,
        this.$$scopeModuleAOpenapi.config.restResource.table?.provider,
        this.$props.tableProvider,
      );
    });
    // jsx
    this.columnCelEnv = this._getColumnCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(
      ZovaJsx,
      false,
      this.tableProvider.components,
      this.tableProvider.actions,
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
    // table
    this._createTable();
  }

  get schema() {
    return this.$props.schema;
  }

  get data() {
    return this.$props.data;
  }

  public onActionTable(action: keyof TypeResourceActionTableRecord) {
    return this.$props.onActionTable?.(action, this);
  }

  public onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<TData>) {
    return this.$props.onActionRow?.(action, row, this);
  }

  private _createTable() {
    const self = this;
    const tableOptions: TableOptionsWithReactiveData<TData> = {
      getRowId: (row: TData) => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: this.scope.config.renderFallbackValue,
      manualPagination: true,
      get data() { return self.data || []; },
      get columns() { return self.columns; },
    };
    this.table = this.$useTable(tableOptions);
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.properties) return [];
      if (!this.$props.getColumns) return this._createColumnsMiddle(this.tableMeta.properties);
      return this.$props.getColumns(properties => {
        return this._createColumnsMiddle(properties ?? this.tableMeta.properties);
      }, this);
    });
  }

  private _createColumnsMiddle(properties: SchemaObject[]) {
    const columnHelper = createColumnHelper<TData>();
    const columns: TypeColumn<TData>[] = [];
    for (const property of properties) {
      const key = property.key!;
      columns.push(columnHelper.accessor(key as any, {
        id: key,
        header: _props => {
          return property?.title || key;
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
    columnScope: ITableColumnCelScope,
  ): Promise<TypeTableCellRender<TData, any>> {
    // renderProvider
    const renderProvider = this.getRenderProvider(columnProps.render);
    // beanInstance
    let beanInstance: ITableCellRender | undefined;
    let onionOptions: IDecoratorTableCellOptions | undefined;
    if (typeof renderProvider === 'string' && renderProvider.includes('.tableCell.')) {
      beanInstance = await this.sys.bean._getBean(renderProvider as any, true);
      const beanOptions = appResource.getBean(renderProvider as any);
      onionOptions = beanOptions?.options as IDecoratorTableCellOptions | undefined;
    }
    return cellContext => {
      if (!cellContext) return;
      return this.zovaJsx.setTransientObject({
        getValue: (name: string) => {
          return cellContext.row.getValue(name);
        },
      }, () => {
        return this._cellRender(property, columnProps, columnScope, cellContext, renderProvider, beanInstance, onionOptions);
      });
    };
  }

  private _cellRender(
    property: SchemaObject,
    columnProps: ITableCellRenderColumnProps,
    columnScope: ITableColumnCelScope,
    cellContext: CellContext<TData, any>,
    renderProvider: TypeTableCellRenderComponentProvider,
    beanInstance: ITableCellRender | undefined,
    onionOptions: IDecoratorTableCellOptions | undefined,
  ) {
    // value
    const value = cellContext.getValue();
    // cellScope
    const cellScope: ITableCellCelScope = Object.assign({}, columnScope, { value });
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
    // renderContext
    const cellRenderContext: IJsxRenderContextTableCell = {
      app: this.app,
      ctx: this.ctx,
      $scene: 'tableCell',
      $host: this,
      $celScope: cellScope,
      $$table: this,
      cellContext,
    };
      // beanInstance
    if (beanInstance) {
      // jsx: props
      let cellProps = isJsxComponent(columnProps.render)
        ? this.zovaJsx.renderJsxProps(cast(columnProps.render).props, { ...columnProps }, cellScope)
        : columnProps;
      if (onionOptions) {
        cellProps = deepExtend({}, onionOptions, cellProps);
      }
      return beanInstance.render(cellProps, cellRenderContext, () => {
        const children = isJsxComponent(columnProps.render) && cast(columnProps.render).children;
        if (children && children.length > 0) {
          return this.zovaJsx.renderJsxChildrenDirect(children, cellScope);
        } else {
          return displayValue;
        }
      });
    }
    // general component
    return this.zovaJsx.render(columnProps.render, {}, cellScope, {
      $$renderContext: cellRenderContext,
    });
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
    celEnv.registerFunction('getValue(string):dyn', name => {
      return this.zovaJsx.transientObject.getValue(name);
    });
    return celEnv;
  }

  public getColumnScope(name: string, scopeExtra?: {}): ITableColumnCelScope {
    return {
      ...this.$props.tableScope,
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
