import type { ModelResource } from 'zova-module-rest-resource';
import { Row } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
// import { TableIdentity } from 'table-identity';
// import { useId } from 'vue';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerForm, formSceneFromFormMeta, IFormMeta, TypeEditMode, TypeFormMode } from 'zova-module-a-form';
import { TypeResourceActionRowRecord, TypeResourceActionTableRecord } from 'zova-module-a-openapi';
import { ITableCelScope, ITableProvider } from 'zova-module-a-table';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  // form
  // rowCurrent?: Row<any>;
  // formVisible: boolean = false;
  formMode: TypeFormMode;
  editMode?: TypeEditMode;
  formMeta: IFormMeta;
  formSchema?: SchemaObject;
  // entryId?: TableIdentity;
  // formProvider: IFormProvider;
  // formScope: IFormCelScope;
  tableProvider: ITableProvider;
  tableScope: ITableCelScope;

  // formDomId: string;
  controllerForm: ControllerForm;

  @Use({ injectionScope: 'host' })
  $$modelResource: ModelResource;

  protected async __init__() {
    this.formMeta = this.$useComputed(() => {
      const formMeta = { formMode: this.formMode, editMode: this.editMode };
      return { ...formMeta, formScene: formSceneFromFormMeta(formMeta) };
    });
    // this.formProvider = this.$useComputed(() => {
    //   return this.$$modelResource.formProvider;
    // });
    // this.formScope = this.$useComputed(() => {
    //   return { resource: this.$$modelResource.resource, permissions: this.$$modelResource.permissions, id: this.entryId };
    // });
    this.tableProvider = this.$useComputed(() => {
      return this.$$modelResource.tableProvider;
    });
    this.tableScope = this.$useComputed(() => {
      return {
        resource: this.$$modelResource.resource,
        permissions: this.$$modelResource.permissions,
        onActionTable: (_action: keyof TypeResourceActionTableRecord) => {},
        onActionRow: (action: keyof TypeResourceActionRowRecord, row: Row<any>) => {
          return this.onActionRow(action, row);
        },
      } satisfies ITableCelScope;
    });
    this.formSchema = this.$useComputed(() => {
      return this.$$modelResource.getFormSchema(this.formMeta);
    });
    // this.entryId = this.$useComputed(() => {
    //   return this.rowCurrent?.getValue('id');
    // });
    // this.formDomId = useId();
  }

  // async onActionTable(action: keyof TypeResourceActionTableRecord) {
  //   if (action === 'create') {
  //     this.formMode = 'edit';
  //     this.editMode = 'create';
  //     this.formVisible = true;
  //   }
  // }

  async onActionRow(action: keyof TypeResourceActionRowRecord, row: Row<any>) {
    // if (action === 'view') {
    //   this.rowCurrent = row;
    //   this.formMode = 'view';
    //   this.editMode = undefined;
    //   this.formVisible = true;
    // } else if (action === 'update') {
    //   this.rowCurrent = row;
    //   this.formMode = 'edit';
    //   this.editMode = 'update';
    //   this.formVisible = true;
    // }
    if (action === 'delete') {
      const mutation = this.$$modelResource.delete(row.id);
      await mutation.mutateAsync();
    }
  }
}
