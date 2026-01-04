import { getCoreRowModel, Row } from '@tanstack/vue-table';
import { VNode } from 'vue';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { BeanControllerTableBase } from '../../lib/beanControllerTableBase.js';
import { BeanTableFeatureBase } from '../../lib/beanTableFeatureBase.js';
import { ServiceTableCellFormat } from '../../service/tableCellFormat.js';
import { ServiceTableFeature } from '../../service/tableFeature.js';
import { TypeTable, TypeTableOptions } from '../../types/table.js';
import { TypeTableCellFormatsMatched } from '../../types/tableCellFormat.js';

export interface ControllerTableProps<TData extends {} = {}> {
  getTableOptions: () => TypeTableOptions<TData>;
  onActionTable?: (action: keyof TypeResourceActionTableRecord) => Promise<any> | undefined;
  onActionRow?: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => Promise<any> | undefined;
  slotDefault?: (table: ControllerTable<TData>) => VNode;
}

@Controller()
export class ControllerTable<TData extends {} = {}> extends BeanControllerTableBase {
  static $propsDefault = {};

  features: BeanTableFeatureBase[] | undefined;
  formats: TypeTableCellFormatsMatched;
  table: TypeTable<TData>;

  @Use()
  $$serviceTableCellFormat: ServiceTableCellFormat;

  @Use()
  $$serviceTableFeature: ServiceTableFeature;

  protected async __init__() {
    this.bean._setBean('$$table', this);
    // features
    await this._createFeatures();
    // table
    this._createTable();
  }

  private _createTable() {
    const self = this;
    const tableOptions = Object.assign({
      _features: this.features,
      getRowId: (row: Row<TData>) => row.id,
      getCoreRowModel: getCoreRowModel(),
      renderFallbackValue: this.scope.config.renderFallbackValue,
      manualPagination: true,
      get actions() {
        return {
          onActionTable: (action: keyof TypeResourceActionTableRecord) => {
            return self.$props.onActionTable?.(action);
          },
          onActionRow: (action: keyof TypeResourceActionRowRecord, row: Row<TData>) => {
            return self.$props.onActionRow?.(action, row);
          },
        };
      },
    }, this.$props.getTableOptions());
    this.table = this.$useTable(tableOptions);
  }

  private async _createFeatures() {
    this.features = await this.$$serviceTableFeature.loadTableFeatures();
  }
}
