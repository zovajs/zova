import { createColumnHelper, getCoreRowModel, Row } from '@tanstack/table-core';
import { cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerTableBase, BeanTableFeatureBase, ServiceTableCellFormat, ServiceTableFeature, TypeColumn, TypeTable, TypeTableCellFormatsMatched } from 'zova-module-a-table';
import { ControllerRestPage } from '../restPage/controller.jsx';
import { RenderActions } from './render.actions.jsx';

export interface ControllerWrapperTableProps<T extends {} = {}> {
  __ignore__?: T;
}

@Controller()
export class ControllerWrapperTable<T extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  columns: TypeColumn<T>[];
  features: BeanTableFeatureBase[] | undefined;
  formats: TypeTableCellFormatsMatched;
  table: TypeTable<T>;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  @Use({ injectionScope: 'host' })
  $$restPage: ControllerRestPage;

  @Use()
  $$serviceTableCellFormat: ServiceTableCellFormat;

  @Use()
  $$serviceTableFeature: ServiceTableFeature;

  @Use()
  $$renderActions: RenderActions;

  protected async __init__() {
    // dataFindAll
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    await queryDataFindAll.suspense();
    // scheam
    await this._loadSchema();
    // columns
    this._createColumns();
    // features
    await this._createFeatures();
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
      columns.push(columnHelper.display({
        id: 'actions',
        header: () => this.scope.locale.TableActions(),
        cell: props => this.$$renderActions.renderActions(props as any),
      }));
      return columns as TypeColumn<T>[];
    });
  }

  private async _createFeatures() {
    this.features = await this.$$serviceTableFeature.loadTableFeatures();
  }

  private async _createFormats() {
    this.formats = await this.$$serviceTableCellFormat.loadTableCellFormatsMatched(this.schema);
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      _features: this.features,
      get schema() { return self.schema; },
      get formats() { return self.formats; },
      get data() { return self.data || []; },
      get columns() { return self.columns; },
      getRowId: row => cast(row).id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: '--',
    });
  }

  async onActionTable(action: keyof TypeResourceActionTableRecord) {
    return this.$$restPage.onActionTable(action);
  }

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<T>) {
    return this.$$restPage.onActionRow(action, row);
  }
}
