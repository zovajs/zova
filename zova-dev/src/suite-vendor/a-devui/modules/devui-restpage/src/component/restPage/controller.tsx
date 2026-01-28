import type { ControllerPageResource, ModelResource } from 'zova-module-rest-resource';
import { createColumnHelper } from '@tanstack/table-core';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { BeanControllerTableBase, ControllerTable, ITablePaged, ITableQuery, ITableResPaged, TypeTableGetColumnsNext } from 'zova-module-a-table';

// @ts-ignore ignore
// eslint-disable-next-line
export interface ControllerRestPageProps<TData extends {} = {}> {
  showFilter?: boolean;
}

@Controller()
export class ControllerRestPage<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = { showFilter: true };

  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;

  @Use({ injectionScope: 'host' })
  $$restPage: ControllerPageResource;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    // query
    this.queryFilterData = {};
    this.queryPaged = { pageNo: 1 };
    this.query = this.$useComputed(() => {
      return Object.assign({}, this.queryFilterData, this.queryPaged);
    });
    // load schema/data
    await $QueriesAutoLoad(
      () => this.$$modelResource.apiSchemasSelect.sdk,
      () => this.queryData,
    );
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
    const permissionUpdate = this.$passport.checkPermission(this.permissions, 'update');
    const permissionDelete = this.$passport.checkPermission(this.permissions, 'delete');
    if (!permissionUpdate && !permissionDelete) return columns;
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
