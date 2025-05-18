import { createColumnHelper } from '@tanstack/table-core';
import { BeanControllerBase, Functionable, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerPageResource } from 'zova-module-a-rest';
import { TypeColumn } from 'zova-module-a-table';

export interface ControllerWrapperTableProps {
  onActionCreate: Functionable;
}

@Controller()
export class ControllerWrapperTable extends BeanControllerBase {
  static $propsDefault = {};

  columns: TypeColumn[];

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    // columns
    this._createColumns();
    // dataFindAll
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    await queryDataFindAll.suspense();
  }

  get data() {
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    return queryDataFindAll.data;
  }

  get schema() {
    const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
    return this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data?.operationObject);
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      if (!this.schema) return [];
      const columnHelper = createColumnHelper();
      const columns: TypeColumn[] = [];
      const properties = this.schema.properties!;
      for (const key in properties) {
        // const property = schema.properties[key];
        columns.push(columnHelper.accessor(key as any, {
          id: key,
          cell: info => info.getValue(),
        }));
      }
      return columns;
    });
  }

  onActionCreate() {
    return this.$props.onActionCreate();
  }
}
