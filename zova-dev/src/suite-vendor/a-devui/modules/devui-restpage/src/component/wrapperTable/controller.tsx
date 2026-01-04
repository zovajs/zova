import type { BeanResource } from 'zova-module-rest-resource';
import { createColumnHelper, Row } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { loadSchemaProperties, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase, ITablePaged, ITableQuery, ITableResPaged, TypeColumn, TypeTableOptions } from 'zova-module-a-table';
import { RenderActions } from './render.actions.jsx';

export interface ControllerWrapperTableProps<TData extends {} = {}> {
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => Promise<any> | undefined;
}

@Controller()
export class ControllerWrapperTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  properties: SchemaObject[] | undefined;
  columns: TypeColumn<TData>[];

  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;

  @Use({ injectionScope: 'host' })
  $$beanResource: BeanResource;

  @Use()
  $$renderActions: RenderActions;

  protected async __init__() {
    // query
    this.queryFilterData = {};
    this.queryPaged = { pageNo: 1 };
    this.query = this.$useComputed(() => {
      return Object.assign({}, this.queryFilterData, this.queryPaged);
    });
    // properties
    this._loadProperties();
    // columns
    this._createColumns();
    // load data
    await $QueryAutoLoad(() => this.queryData);
  }

  get queryData() {
    return this.$$beanResource.getQueryDataSelect(this.query);
  }

  get data() {
    return this.queryData.data?.list;
  }

  get paged(): ITableResPaged | undefined {
    return this.queryData.data;
  }

  get schema() {
    return this.$$beanResource.schemaRow;
  }

  _loadProperties() {
    this.properties = loadSchemaProperties(this.schema, 'table');
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.properties) return [];
      const columnHelper = createColumnHelper();
      const columns: TypeColumn[] = [];
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
      if (this.$$beanResource.permissions?.row?.update || this.$$beanResource.permissions?.row?.delete) {
        columns.push(columnHelper.display({
          id: 'actions',
          header: () => this.scope.locale.TableActions(),
          cell: props => this.$$renderActions.renderActions(props as any),
        }));
      }
      return columns as TypeColumn<TData>[];
    });
  }

  public getTableOptions(): TypeTableOptions<TData> {
    const self = this;
    return {
      get schema() { return self.schema; },
      get data() { return self.data || []; },
      get columns() { return self.columns; },
    };
  }

  _onFilter(data: any) {
    this.queryFilterData = data;
  }

  async onActionTable(action: keyof TypeResourceActionTableRecord) {
    return this.$props.onActionTable?.(action);
  }

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<TData>) {
    return this.$props.onActionRow?.(action, row);
  }

  gotoPage(pageNo: number) {
    this.queryPaged.pageNo = pageNo;
  }
}
