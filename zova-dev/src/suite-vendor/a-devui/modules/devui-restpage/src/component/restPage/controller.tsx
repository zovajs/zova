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
      this.onActionCreate();
    }
  }

  onActionRow(action: keyof TypeResourceActionRowRecord, _row: Row<any>): void {
    if (action === 'update') {
      console.log('update');
    } else if (action === 'delete') {
      console.log('delete');
    }
  }

  onActionCreate() {
    this.formMode = 'edit';
    this.editMode = 'create';
    this.formVisible = true;
  }

  getMutationSubmit(): DataMutation | undefined {
    if (this.formMode !== 'edit') return;
    if (this.editMode === 'create') {
      return this.$$restResource.getMutationCreate() as any;
    }
  }
}
