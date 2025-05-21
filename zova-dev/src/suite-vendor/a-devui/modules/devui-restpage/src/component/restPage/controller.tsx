import type { ControllerPageResource } from 'zova-module-a-rest';
import { Row } from '@tanstack/table-core';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta, IFormProvider, TypeEditMode, TypeFormMode } from 'zova-module-a-form';
import { DataMutation } from 'zova-module-a-model';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  // form
  rowCurrent?: Row<any>;
  formVisible: boolean = false;
  formMode?: TypeFormMode;
  editMode?: TypeEditMode;
  formMeta: IFormMeta;
  formProvider: IFormProvider;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    this.formMeta = this.$useComputed(() => {
      return { formMode: this.formMode, editMode: this.editMode };
    });
    this.formProvider = this.$useComputed(() => {
      return this.$$restResource.formProvider || {};
    });
  }

  onActionTable(action: keyof TypeResourceActionTableRecord): void {
    if (action === 'create') {
      this.formMode = 'edit';
      this.editMode = 'create';
      this.formVisible = true;
    }
  }

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<any>) {
    if (action === 'update') {
      this.rowCurrent = row;
      this.formMode = 'edit';
      this.editMode = 'update';
      this.formVisible = true;
    } else if (action === 'delete') {
      // eslint-disable-next-line no-alert
      if (window.confirm(this.scope.locale.DeleteConfirm())) {
        const mutation = this.$$restResource.getMutationDelete(row.id);
        await mutation.mutateAsync();
      }
    }
  }

  getMutationSubmit(): DataMutation | undefined {
    if (this.formMode !== 'edit') return;
    if (this.editMode === 'create') {
      return this.$$restResource.getMutationCreate() as any;
    }
    if (this.editMode === 'update') {
      return this.$$restResource.getMutationUpdate(this.rowCurrent?.original.id) as any;
    }
  }
}
