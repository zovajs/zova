import { useId } from 'vue';
import { BeanControllerBase, cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta } from 'zova-module-a-form';
import { ControllerPageResource } from 'zova-module-a-rest';

export interface ControllerWrapperFormProps {
  formMeta: IFormMeta;
}

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  static $propsDefault = {};

  formId: string;

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    this.formId = useId();
  }

  showModal() {
    const dialog = cast<HTMLDialogElement | undefined>(document.getElementById(this.formId));
    dialog?.showModal();
  }
}
