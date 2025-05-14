import { useId } from 'vue';
import { BeanControllerBase, cast, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormMeta } from 'zova-module-a-form';
import { ControllerPageResource } from 'zova-module-a-rest';

@Controller()
export class ControllerWrapperForm extends BeanControllerBase {
  formId: string;
  formMeta: IFormMeta = {};

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
