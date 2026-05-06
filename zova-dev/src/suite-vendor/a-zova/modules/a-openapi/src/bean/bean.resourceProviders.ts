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
        components: Object.assign({}, resourceProviders.formFields, resourceProviders.form?.actionsRow),
        actions: resourceProviders.performActions,
        behaviors: resourceProviders.behaviors,
      };
    });
    this.tableProvider = this.$useComputed(() => {
      const resourceProviders = this.scope.config.resourceProviders;
      return {
        components: Object.assign({}, resourceProviders.tableCells, resourceProviders.table?.actionsRow),
        actions: resourceProviders.performActions,
      };
    });
  }
}
