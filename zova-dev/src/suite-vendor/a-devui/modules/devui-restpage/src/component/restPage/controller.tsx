import type { ControllerPageResource } from 'zova-module-a-rest';
import { Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerTableBase, TypeColumn, TypeTable } from 'zova-module-a-table';

@Controller()
export class ControllerRestPage extends BeanControllerTableBase {
  table: TypeTable;
  columns: TypeColumn[];

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    // dataFindAll
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    await queryDataFindAll.suspense();
    // columns
    this._createColumns();
    // table
    this._createTable();
  }

  private _createColumns() {
    this.columns = this.$useComputed(() => {
      const querySdkBootstrap = this.$$restResource.getQuerySdkBootstrap();
      if (!querySdkBootstrap.data) return [];
      const schema = this.$$restResource.getSchemaOfTableRow(querySdkBootstrap.data.operationObject);
      if (!schema) return [];
      const columnHelper = createColumnHelper<Person>();
      return [];
    });
  }

  private _createTable() {
    const self = this;
    this.table = this.$useTable({
      get data() {
        const queryDataFindAll = self.$$restResource.getQueryDataFindAll();
        return queryDataFindAll.data || [];
      },
      columns: this.columns as any,
    } as any);
  }
}
