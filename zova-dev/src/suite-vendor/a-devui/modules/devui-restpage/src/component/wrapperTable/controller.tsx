import type { BeanResource } from 'zova-module-rest-resource';
import { createColumnHelper, getCoreRowModel, Row } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
import { cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase, BeanTableFeatureBase, ITableActionHandler, ITablePaged, ITableQuery, ITableResPaged, ServiceTableCellFormat, ServiceTableFeature, TypeColumn, TypeTable, TypeTableCellFormatsMatched } from 'zova-module-a-table';
import { RenderActions } from './render.actions.jsx';

export interface ControllerWrapperTableProps<T extends {} = {}> extends ITableActionHandler<T> {}

@Controller()
export class ControllerWrapperTable<T extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  properties: SchemaObject[] | undefined;
  columns: TypeColumn<T>[];
  features: BeanTableFeatureBase[] | undefined;
  formats: TypeTableCellFormatsMatched;
  table: TypeTable<T>;

  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;

  @Use({ injectionScope: 'host' })
  $$beanResource: BeanResource;

  @Use()
  $$serviceTableCellFormat: ServiceTableCellFormat;

  @Use()
  $$serviceTableFeature: ServiceTableFeature;

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
    // features
    await this._createFeatures();
    // formats
    await this._createFormats();
    // table
    this._createTable();
    // load data
    // if (process.env.SERVER) {
    await this._loadData();
    // }
  }

  get data() {
    const queryDataSelect = this.$$beanResource.getQueryDataSelect(this.query);
    return queryDataSelect.data?.list;
  }

  get paged(): ITableResPaged | undefined {
    const queryDataSelect = this.$$beanResource.getQueryDataSelect(this.query);
    return queryDataSelect.data;
  }

  get schema() {
    return this.$$beanResource.schemaRow;
  }

  async _loadData() {
    const queryDataSelect = this.$$beanResource.getQueryDataSelect(this.query);
    await queryDataSelect.suspense();
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
      return columns as TypeColumn<T>[];
    });
  }

  private async _createFeatures() {
    this.features = await this.$$serviceTableFeature.loadTableFeatures();
  }

  private async _createFormats() {
    this.formats = await this.$$serviceTableCellFormat.loadTableCellFormatsMatched(this.properties);
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      _features: this.features,
      get actions() {
        return {
          onActionTable: (action: keyof TypeResourceActionTableRecord) => {
            return self.$props.onActionTable?.(action);
          },
          onActionRow: (action: keyof TypeResourceActionRowRecord, row: Row<T>) => {
            return self.$props.onActionRow?.(action, row);
          },
        };
      },
      get schema() { return self.schema; },
      get formats() { return self.formats; },
      get data() { return self.data || []; },
      get columns() { return self.columns; },
      getRowId: row => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: '--',
      manualPagination: true,
    });
  }

  _onFilter(data: any) {
    this.queryFilterData = data;
  }

  async onActionTable(action: keyof TypeResourceActionTableRecord) {
    return this.$props.onActionTable?.(action);
  }

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<T>) {
    return this.$props.onActionRow?.(action, row);
  }

  gotoPage(pageNo: number) {
    this.queryPaged.pageNo = pageNo;
  }
}
