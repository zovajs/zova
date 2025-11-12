import z from 'zod';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { ToolV } from 'zova-module-a-zod';

@Controller()
export class ControllerCaptcha extends BeanControllerBase {
  zodSchema: z.ZodString;

  @Use()
  $$v: ToolV;

  protected async __init__() {
    this.zodSchema = this.$$v.required(z.string());
  }

  protected render() {
    return (
      <>
        <ZFormField
          name="captcha.token"
          validators={{ onDynamic: this.zodSchema }}
        ></ZFormField>
      </>
    );
  }
}
