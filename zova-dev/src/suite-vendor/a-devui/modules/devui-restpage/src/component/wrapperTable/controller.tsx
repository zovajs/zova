import type { BeanResource } from 'zova-module-rest-resource';
import { createColumnHelper, Row } from '@tanstack/table-core';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $QueryAutoLoad } from 'zova-module-a-model';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase, ControllerTable, ITablePaged, ITableQuery, ITableResPaged, TypeTableGetColumnsNext } from 'zova-module-a-table';
import { RenderActions } from './render.actions.jsx';

export interface ControllerWrapperTableProps<TData extends {} = {}> {
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => Promise<any> | undefined;
}

@Controller()
export class ControllerWrapperTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

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

  getColumns(next: TypeTableGetColumnsNext<TData>, _$$table: ControllerTable<TData>) {
    const columns = next();
    if (!this.$$beanResource.permissions?.row?.update && !this.$$beanResource.permissions?.row?.delete) return columns;
    const columnHelper = createColumnHelper<TData>();
    columns.push(columnHelper.display({
      id: 'actions',
      header: () => this.scope.locale.TableActions(),
      cell: props => this.$$renderActions.renderActions(props as any),
    }));
    return columns;
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

  async onActionDelete(row: Row<TData>) {
    // eslint-disable-next-line no-alert
    if (!window.confirm(this.scope.locale.DeleteConfirm())) return;
    return this.onActionRow('delete', row);
  }

  gotoPage(pageNo: number) {
    this.queryPaged.pageNo = pageNo;
  }
}
