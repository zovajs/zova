import type { ModelResource } from 'zova-module-rest-resource';
import { createColumnHelper, Row } from '@tanstack/table-core';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase, ControllerTable, ITableCelScope, ITablePaged, ITableProvider, ITableQuery, ITableResPaged, TypeTableGetColumnsNext } from 'zova-module-a-table';

// @ts-ignore ignore
// eslint-disable-next-line
export interface ControllerRestPageProps<TData extends {} = {}> {
  showFilter?: boolean;
}

@Controller()
export class ControllerRestPage<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = { showFilter: true };

  tableProvider: ITableProvider;
  tableScope: ITableCelScope;

  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {
    this.tableProvider = this.$useComputed(() => {
      return this.$$modelResource.tableProvider;
    });
    this.tableScope = this.$useComputed(() => {
      return {
        resource: this.$$modelResource.resource,
        permissions: this.$$modelResource.permissions,
        onActionTable: (action: keyof TypeResourceActionTableRecord) => {
          return this.onActionTable(action);
        },
        onActionRow: (action: keyof TypeResourceActionRowRecord, row: Row<any>) => {
          return this.onActionRow(action, row);
        },
      } satisfies ITableCelScope;
    });
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

  async onActionTable(_action: keyof TypeResourceActionTableRecord) {}

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<any>) {
    if (action === 'delete') {
      const mutation = this.$$modelResource.delete(row.id);
      await mutation.mutateAsync();
    }
  }
}
