import { BeanBase } from 'zova';
import { Bean } from 'zova-module-a-bean';

import { IFormProvider, ITableProvider } from '../types/resourceProviders.js';

@Bean()
export class BeanResourceProviders extends BeanBase {
  public formProvider: IFormProvider;
  public tableProvider: ITableProvider;

  protected async __init__() {
    this.formProvider = this.$useComputed(() => {
      const resourceProviders = this.scope.config.resourceProviders;
      return {
        components: Object.assign({}, resourceProviders.blocks, resourceProviders.formFields, resourceProviders.form?.actionsRow),
        behaviors: resourceProviders.behaviors,
      };
    });
    this.tableProvider = this.$useComputed(() => {
      const resourceProviders = this.scope.config.resourceProviders;
      return {
        components: Object.assign(
          {},
          resourceProviders.blocks,
          resourceProviders.tableCells,
          resourceProviders.table?.actionsBulk,
          resourceProviders.table?.actionsRow,
        ),
      };
    });
  }
}
