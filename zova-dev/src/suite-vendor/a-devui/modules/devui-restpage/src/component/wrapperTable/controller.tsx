import type { ModelResource } from 'zova-module-rest-resource';
import { createColumnHelper } from '@tanstack/table-core';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { BeanControllerTableBase, ControllerTable, ITableCelScope, ITablePaged, ITableProvider, ITableQuery, ITableResPaged, TypeTableGetColumnsNext } from 'zova-module-a-table';

// @ts-ignore ignore
// eslint-disable-next-line
export interface ControllerWrapperTableProps<TData extends {} = {}> {
  tableProvider?: ITableProvider;
  tableScope: ITableCelScope;
}

@Controller()
export class ControllerWrapperTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {
    // query
    this.queryFilterData = {};
    this.queryPaged = { pageNo: 1 };
    this.query = this.$useComputed(() => {
      return Object.assign({}, this.queryFilterData, this.queryPaged);
    });
    // load data
    await $QueryAutoLoad(() => this.queryData);
  }

  get queryData() {
    return this.$$modelResource.select(this.query);
  }

  get data() {
    return this.queryData.data?.list;
  }

  get paged(): ITableResPaged | undefined {
    return this.queryData.data;
  }

  get schema() {
    return this.$$modelResource.schemaRow;
  }

  get permissions() {
    return this.$$modelResource.permissions;
  }

  async getColumns(next: TypeTableGetColumnsNext<TData>, $$table: ControllerTable<TData>) {
    const columns = await next();
    if (!this.permissions?.row?.update && !this.permissions?.row?.delete) return columns;
    const columnHelper = createColumnHelper<TData>();
    const id = 'actions';
    const columnRender = await $$table.createColumnRender(id, 'actionOperationsRow');
    columns.push(columnHelper.display({
      id: 'actions',
      header: () => this.scope.locale.TableActions(),
      cell: columnRender,
    }));
    return columns;
  }

  _onFilter(data: any) {
    this.queryFilterData = data;
  }

  gotoPage(pageNo: number) {
    this.queryPaged.pageNo = pageNo;
  }
}
