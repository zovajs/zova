import z from 'zod';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';

@Controller()
export class ControllerCaptcha extends BeanControllerBase {
  zodSchema: z.ZodString;

  protected async __init__() {
    this.zodSchema = z.string();
  }

  protected render() {
    return (
      <>
        <ZFormField name="captcha.token" validators={{ onDynamic: this.zodSchema }}></ZFormField>
      </>
    );
  }
}
