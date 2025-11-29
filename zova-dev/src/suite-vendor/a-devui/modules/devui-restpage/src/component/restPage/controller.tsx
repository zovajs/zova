import type { BeanResource } from 'zova-module-rest-resource';
import { Row } from '@tanstack/table-core';
import { TableIdentity } from 'table-identity';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta, IFormProvider, TypeEditMode, TypeFormMode } from 'zova-module-a-form';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { ITableActionHandler } from 'zova-module-a-table';

@Controller()
export class ControllerRestPage extends BeanControllerBase implements ITableActionHandler {
  // form
  rowCurrent?: Row<any>;
  formVisible: boolean = false;
  formMode?: TypeFormMode;
  editMode?: TypeEditMode;
  formMeta: IFormMeta;
  formProvider: IFormProvider;
  rowId?: TableIdentity;

  @Use({ injectionScope: 'host' })
  $$beanResource: BeanResource;

  protected async __init__() {
    this.formMeta = this.$useComputed(() => {
      return { formMode: this.formMode, editMode: this.editMode };
    });
    this.formProvider = this.$useComputed(() => {
      return this.$$beanResource.formProvider || {};
    });
    this.rowId = this.$useComputed(() => {
      return this.rowCurrent?.getValue('id');
    });
  }

  async onActionTable(action: keyof TypeResourceActionTableRecord) {
    if (action === 'create') {
      this.formMode = 'edit';
      this.editMode = 'create';
      this.formVisible = true;
    }
  }

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<any>) {
    if (action === 'view') {
      this.rowCurrent = row;
      this.formMode = 'view';
      this.editMode = undefined;
      this.formVisible = true;
    } else if (action === 'update') {
      this.rowCurrent = row;
      this.formMode = 'edit';
      this.editMode = 'update';
      this.formVisible = true;
    } else if (action === 'delete') {
      // eslint-disable-next-line no-alert
      if (window.confirm(this.scope.locale.DeleteConfirm())) {
        const mutation = this.$$beanResource.getMutationDelete(row.id);
        await mutation.mutateAsync();
      }
    }
  }
}
