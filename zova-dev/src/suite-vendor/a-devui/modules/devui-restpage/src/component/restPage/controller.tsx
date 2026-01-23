import type { ModelResource } from 'zova-module-rest-resource';
import { Row } from '@tanstack/table-core';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { ITableCelScope, ITableProvider } from 'zova-module-a-table';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  tableProvider: ITableProvider;
  tableScope: ITableCelScope;

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
  }

  async onActionTable(_action: keyof TypeResourceActionTableRecord) {}

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<any>) {
    if (action === 'delete') {
      const mutation = this.$$modelResource.delete(row.id);
      await mutation.mutateAsync();
    }
  }
}
