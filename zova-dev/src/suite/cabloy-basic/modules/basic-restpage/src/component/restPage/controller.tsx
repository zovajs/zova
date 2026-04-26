import type { ControllerPageResource, ModelResource } from 'zova-module-rest-resource';

import { celEnvBase } from '@cabloy/utils';
import { createColumnHelper } from '@tanstack/table-core';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { ITablePaged, ITableQuery, ITableResPaged } from 'zova-module-a-openapi';
import {
  BeanControllerTableBase,
  ControllerTable,
  TypeTableGetColumnsNext,
} from 'zova-module-a-table';

import { IJsxRenderContextPage, IPageScope } from '../../types/page.js';

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
  $$pageWrapper: ControllerPageResource;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    this.bean._setBean('$$page', this);
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

  get resource() {
    return this.$$pageWrapper.resource;
  }

  get tableProvider() {
    return this.$$pageWrapper.tableProvider;
  }

  get pageScope(): IPageScope {
    return this.$$pageWrapper.pageWrapperScope;
  }

  get zovaJsx() {
    return this.$$pageWrapper.zovaJsx;
  }

  get pageCelEnv(): typeof celEnvBase {
    return this.$$pageWrapper.pageWrapperCelEnv;
  }

  public getJsxRenderContextPage(celScope: IPageScope): IJsxRenderContextPage<TData> {
    return {
      app: this.app,
      ctx: this.ctx,
      $scene: 'page',
      $host: this,
      $celScope: celScope,
      $jsx: this.zovaJsx,
      $$page: this,
    };
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
    columns.push(
      columnHelper.display({
        id: 'actions',
        header: () => this.scope.locale.TableActions(),
        cell: columnRender,
      }),
    );
    return columns;
  }

  gotoPage(pageNo: number) {
    if (this.queryPaged.pageNo !== pageNo) {
      this.queryPaged.pageNo = pageNo;
    }
  }

  onFilter(data: any) {
    this.queryFilterData = data;
  }
}
