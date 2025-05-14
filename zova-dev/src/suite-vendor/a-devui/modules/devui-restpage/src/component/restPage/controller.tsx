import type { ControllerPageResource } from 'zova-module-a-rest';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta, TypeEditMode, TypeFormMode } from 'zova-module-a-form';
import { ControllerWrapperForm } from '../wrapperForm/controller.jsx';

@Controller()
export class ControllerRestPage extends BeanControllerBase {
  // form
  wrapperFormRef?: ControllerWrapperForm;
  formVisible: boolean = false;
  formMode?: TypeFormMode;
  editMode?: TypeEditMode;
  formMeta: IFormMeta;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    this.formMeta = this.$useComputed(() => {
      return { formMode: this.formMode, editMode: this.editMode };
    });
  }

  onOperationCreate() {
    this.formMode = 'edit';
    this.editMode = 'create';
    this.formVisible = true;
  }
}
