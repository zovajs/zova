import { celEnvBase, isNilOrEmptyString } from '@cabloy/utils';
import { CellContext, createColumnHelper, getCoreRowModel, TableOptionsWithReactiveData } from '@tanstack/vue-table';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { appResource, cast, deepEqual, deepExtend, objectAssignReactive, UseScope } from 'zova';
import { isJsxComponent, ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import {
  renderTableColumnTopPropsSystem,
  ScopeModuleAOpenapi,
  TypeTableCellRenderComponent,
  TypeTableCellRenderComponentProvider,
} from 'zova-module-a-openapi';

import type { ITableProvider } from '../../types/providers.js';
import type { ITableMeta, TypeColumn, TypeTable, TypeTableGetColumns } from '../../types/table.js';
import type { IDecoratorTableCellOptions, IJsxRenderContextTableCell, ITableCellRender } from '../../types/tableCell.js';

import { BeanControllerTableBase } from '../../lib/beanControllerTableBase.js';
import {
  constColumnProps,
  type IJsxRenderContextTableColumn,
  type ITableCellRenderColumnProps,
  type ITableCellScope,
  type ITableColumnScope,
  type ITableScope,
  type TypeTableCellRender,
} from '../../types/tableColumn.js';

export interface ControllerTableProps<TData extends {} = {}> {
  data?: TData[];
  schema?: SchemaObject;
  tableProvider?: ITableProvider;
  tableScope?: ITableScope;
  getColumns?: TypeTableGetColumns<TData>;
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
        this.$$scopeModuleAOpenapi.config.resourceMeta.provider,
        this.$$scopeModuleAOpenapi.config.resourceMeta.table?.provider,
        this.$props.tableProvider,
      );
    });
    // jsx
    this.columnCelEnv = this._getColumnCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(ZovaJsx, false, this.tableProvider.components, this.tableProvider.actions, this.columnCelEnv);
    // properties
    this._createProperties();
    // tableMeta/columns
    await this.refreshMeta();
    // watch
    this.$watch(
      () => this.$props.schema,
      async (newValue, oldValue) => {
        if (deepEqual(newValue, oldValue)) return;
        await this.refreshMeta();
      },
    );
    // table
    this._createTable();
  }

  get schema() {
    return this.$props.schema;
  }

  get data() {
    return this.$props.data;
  }

  public async refreshMeta() {
    this.tableMeta = await this._createTableMeta();
    this.columns = await this._createColumns();
  }

  private _createTable() {
    // eslint-disable-next-line
    const self = this;
    const tableOptions: TableOptionsWithReactiveData<TData> = {
      getRowId: (row: TData) => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: this.scope.config.renderFallbackValue,
      manualPagination: true,
      get data() {
        return self.data || [];
      },
      get columns() {
        return self.columns;
      },
    };
    this.table = this.$useTable(tableOptions);
  }

  private async _createColumns() {
    if (!this.properties) return [];
    if (!this.$props.getColumns) return await this._createColumnsMiddle(this.tableMeta.properties);
    return await this.$props.getColumns(
      async properties => {
        return await this._createColumnsMiddle(properties ?? this.tableMeta.properties);
      },
      async (key: string, render: TypeTableCellRenderComponent): Promise<TypeTableCellRender<TData, any> | undefined> => {
        // columnScope
        const columnScope = this.getColumnScope(key);
        // renderContext
        const jsxRenderContext = this.getColumnJsxRenderContext(columnScope);
        // columnProps
        const columnProps = this.getColumnComponentPropsTop(key, columnScope, jsxRenderContext);
        // visible
        if (columnProps.visible === false) return;
        const property = this.getColumnProperty(key);
        return await this._createColumnRender(render, property, columnProps, columnScope, jsxRenderContext);
      },
      this,
    );
  }

  private async _createColumnsMiddle(properties: SchemaObject[]): Promise<TypeColumn<TData>[]> {
    const tableMeta = this.tableMeta;
    const columnHelper = createColumnHelper<TData>();
    const columns: TypeColumn<TData>[] = [];
    for (const property of properties) {
      const key = property.key!;
      columns.push(
        columnHelper.accessor(key as any, {
          id: key,
          header: _props => {
            return property?.title || key;
          },
          cell: props => tableMeta.renders[key](props),
        }),
      );
    }
    return columns;
  }

  private _createProperties() {
    this.properties = this.$useComputed(() => {
      return this.$sdk.loadSchemaProperties(this.schema, 'table');
    });
  }

  private async _createTableMeta() {
    let properties: SchemaObject[] = [];
    const renders: Record<string, TypeTableCellRender<TData>> = {};
    if (!this.properties) return { properties, renders };
    const promises: Promise<any>[] = [];
    for (const property of this.properties) {
      const key = property.key!;
      // columnScope
      const columnScope = this.getColumnScope(key);
      // renderContext
      const jsxRenderContext = this.getColumnJsxRenderContext(columnScope);
      // columnProps
      const columnProps = this.getColumnComponentPropsTop(key, columnScope, jsxRenderContext);
      // visible
      if (columnProps.visible === false) continue;
      // property
      properties.push(property);
      // render
      promises.push(this._createColumnRender(columnProps.render, property, columnProps, columnScope, jsxRenderContext));
    }
    let res = await Promise.all(promises);
    properties = properties.filter((_item, index) => !!res[index]);
    res = res.filter(item => !!item);
    properties.forEach((item, index) => {
      renders[item.key!] = res[index];
    });
    return { properties, renders };
  }

  public getColumnJsxRenderContext(celScope: ITableColumnScope): IJsxRenderContextTableColumn {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: 'tableColumn',
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$table: this,
    };
  }

  public getCellJsxRenderContext(celScope: ITableCellScope, cellContext: CellContext<TData, any>): IJsxRenderContextTableCell {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: 'tableCell',
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$table: this,
      cellContext,
    };
  }

  public async prepareRenderComponent(renders: TypeTableCellRenderComponent | TypeTableCellRenderComponent[]) {
    if (!Array.isArray(renders)) renders = [renders];
    const renderProviders = renders.map(item => this.getRenderProvider(item));
    const promises: Promise<any>[] = renderProviders.map(renderProvider =>
      (async () => {
        if (typeof renderProvider === 'string' && renderProvider.includes('.tableCell.')) {
          return await this.sys.bean._getBean(renderProvider as any, true);
        }
      })(),
    );
    return await Promise.all(promises);
  }

  private async _createColumnRender(
    render: TypeTableCellRenderComponent,
    property: SchemaObject | undefined,
    columnProps: ITableCellRenderColumnProps | undefined,
    columnScope: ITableColumnScope,
    renderContext: IJsxRenderContextTableColumn,
  ): Promise<TypeTableCellRender<TData, any> | undefined> {
    // renderProvider
    const renderProvider = this.getRenderProvider(render);
    // beanInstance
    let beanInstance: ITableCellRender | undefined;
    if (typeof renderProvider === 'string' && renderProvider.includes('.tableCell.')) {
      beanInstance = await this.sys.bean._getBean(renderProvider as any, true);
      const beanOptions = appResource.getBean(renderProvider as any);
      const onionOptions = beanOptions?.options as IDecoratorTableCellOptions | undefined;
      columnProps = deepExtend({}, onionOptions, columnProps);
      if (beanInstance?.checkVisible && !(await beanInstance.checkVisible(columnProps as any, renderContext))) return;
    }
    return cellContext => {
      if (!cellContext) return;
      return this._cellRender(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance);
    };
  }

  private _cellRender(
    render: TypeTableCellRenderComponent,
    property: SchemaObject | undefined,
    columnProps: ITableCellRenderColumnProps | undefined,
    columnScope: ITableColumnScope,
    cellContext: CellContext<TData, any>,
    renderProvider: TypeTableCellRenderComponentProvider,
    beanInstance: ITableCellRender | undefined,
  ) {
    return this.zovaJsx.setTransientObject(
      {
        getValue: (name: string) => {
          return cellContext.row.getValue(name);
        },
      },
      () => {
        return this._cellRenderInner(render, property, columnProps, columnScope, cellContext, renderProvider, beanInstance);
      },
    );
  }

  private _cellRenderInner(
    render: TypeTableCellRenderComponent,
    _property: SchemaObject | undefined,
    columnProps: ITableCellRenderColumnProps | undefined,
    columnScope: ITableColumnScope,
    cellContext: CellContext<TData, any>,
    renderProvider: TypeTableCellRenderComponentProvider,
    beanInstance: ITableCellRender | undefined,
  ) {
    // value
    const value = cellContext.getValue();
    // renderFallbackValue
    const fallbackValue = this.table.options.renderFallbackValue;
    // cellScope
    const cellScope: ITableCellScope = objectAssignReactive({}, columnScope, { value, fallbackValue });
    // render: text
    if (renderProvider === 'text') {
      return isNilOrEmptyString(value) ? fallbackValue : value;
    }
    // renderContext
    const jsxRenderContext = this.getCellJsxRenderContext(cellScope, cellContext);
    // beanInstance
    if (beanInstance) {
      // jsx: props
      const cellProps = isJsxComponent(render)
        ? this.zovaJsx.renderJsxProps(cast(render).props, { ...columnProps }, cellScope, jsxRenderContext)
        : columnProps;
      return beanInstance.render(cellProps ?? {}, jsxRenderContext, () => {
        const children = isJsxComponent(render) && cast(render).children;
        if (children && children.length > 0) {
          return this.zovaJsx.renderJsxChildrenDirect(children, cellScope, jsxRenderContext);
        } else {
          return value;
        }
      });
    }
    // general component
    return this.zovaJsx.render(render, {}, cellScope, jsxRenderContext);
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

  public getColumnScope(name: string, scopeExtra?: {}): ITableColumnScope {
    return objectAssignReactive({}, this.$props.tableScope, {
      name,
      property: this.getColumnProperty(name),
      ...scopeExtra,
    });
  }

  public getColumnComponentPropsTop(name: string, celScope: {}, renderContext: {}): ITableCellRenderColumnProps {
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
        keyValue = this.zovaJsx.renderJsxOrCel(value, undefined, celScope, renderContext);
      }
      props[key] = keyValue;
    }
    return props;
  }

  // public getRenderFlattern(render: TypeTableCellRenderComponent): TypeTableCellRenderComponent {
  //   return isJsxComponent(render) ? cast(render).type : render;
  // }

  public getRenderProvider(render: TypeTableCellRenderComponent): TypeTableCellRenderComponentProvider {
    if (isJsxComponent(render)) {
      return cast(render).type;
    }
    if (typeof render === 'string') {
      render = this.tableProvider.components?.[render] ?? render;
    }
    return (render ?? 'text') as TypeTableCellRenderComponentProvider;
  }
}
