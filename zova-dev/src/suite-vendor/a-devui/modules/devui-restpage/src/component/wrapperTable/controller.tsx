import { createColumnHelper, getCoreRowModel } from '@tanstack/table-core';
import { cast, Functionable, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerTableBase, ServiceTableCellFormat, TableFeatureFormat, TableFeatureSchema, TypeColumn, TypeTable, TypeTableCellFormatsMatched } from 'zova-module-a-table';

export interface ControllerWrapperTableProps<T extends {} = {}> {
  __ignore__?: T;
  onActionCreate: Functionable;
}

@Controller()
export class ControllerWrapperTable<T extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  columns: TypeColumn<T>[];
  formats: TypeTableCellFormatsMatched;
  table: TypeTable<T>;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  @Use()
  $$serviceTableCellFormat: ServiceTableCellFormat;

  protected async __init__() {
    // dataFindAll
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    await queryDataFindAll.suspense();
    // scheam
    await this._loadSchema();
    // columns
    this._createColumns();
    // formats
    await this._createFormats();
    // table
    this._createTable();
  }

  get data() {
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return queryDataFindAll.data;
  }

  async _loadSchema() {
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    const querySchema = this.$$restResource.getQuerySchemaOfTableRow(querySdkBootstrap.data?.operationObject);
    await querySchema?.suspense();
  }

  get schema() {
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    const querySchema = this.$$restResource.getQuerySchemaOfTableRow(querySdkBootstrap.data?.operationObject);
    return querySchema?.data;
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.schema) return [];
      const columnHelper = createColumnHelper();
      const columns: TypeColumn[] = [];
      const properties = this.schema.properties!;
      for (const key in properties) {
        columns.push(columnHelper.accessor(key as any, {
          id: key,
          header: props => {
            return props.header.property?.description || key;
          },
          cell: props => props.cell.formatRender(),
        }));
      }
      return columns as TypeColumn<T>[];
    });
  }

  private async _createFormats() {
    this.formats = await this.$$serviceTableCellFormat.loadTableCellFormatsMatched(this.schema);
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      _features: [TableFeatureSchema, TableFeatureFormat],
      get schema() { return self.schema; },
      get formats() { return self.formats; },
      get data() { return self.data || []; },
      get columns() { return self.columns; },
      getRowId: row => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: '--',
    });
  }

  onActionCreate() {
    return this.$props.onActionCreate();
  }
}
