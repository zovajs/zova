import type { BeanResource } from 'zova-module-rest-resource';
import { Row } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
import { TableIdentity } from 'table-identity';
import { useId } from 'vue';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, IFormMeta, IFormProvider, TypeEditMode, TypeFormMode } from 'zova-module-a-form';
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
  formSchema?: SchemaObject;
  rowId?: TableIdentity;

  formDomId: string;
  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$beanResource: BeanResource;

  protected async __init__() {
    this.formMeta = this.$useComputed(() => {
      return { formMode: this.formMode, editMode: this.editMode };
    });
    this.formProvider = this.$useComputed(() => {
      return this.$$beanResource.formProvider || {};
    });
    this.formSchema = this.$useComputed(() => {
      return this.$$beanResource.getFormSchema(this.formMeta);
    });
    this.rowId = this.$useComputed(() => {
      return this.rowCurrent?.getValue('id');
    });
    this.formDomId = useId();
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
