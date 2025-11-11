import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';

@Controller()
export class ControllerCaptcha extends BeanControllerBase {
  protected async __init__() {}

  protected render() {
    return <ZFormField name="captcha"></ZFormField>;
  }
}
