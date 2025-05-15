import type { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormBehaviors, IFormMeta, TypeEditMode, TypeFormMode, TypeFormOnSubmitData } from 'zova-module-a-form';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  // form
  formVisible: boolean = false;
  formMode?: TypeFormMode;
  editMode?: TypeEditMode;
  formMeta: IFormMeta;
  formBehaviors: IFormBehaviors;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    this.formMeta = this.$useComputed(() => {
      return { formMode: this.formMode, editMode: this.editMode };
    });
    this.formBehaviors = this.$useComputed(() => {
      return this.$$restResource.formBehaviors;
    });
  }

  onOperationCreate() {
    this.formMode = 'edit';
    this.editMode = 'create';
    this.formVisible = true;
  }

  onSubmit(data: TypeFormOnSubmitData) {
    console.log('--submit--:', data);
  }
}
