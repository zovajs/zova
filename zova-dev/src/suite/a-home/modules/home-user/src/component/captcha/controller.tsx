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
    this.$api.captcha.create({ scene: '' });
  }

  protected render() {
    return (
      <>
        <ZFormField
          name="captcha.token"
          validators={{ onDynamic: this.zodSchema }}
        ></ZFormField>
        <label class="flex items-center gap-2 w-full">
          <img src="https://avatars.githubusercontent.com/u/24246985?v=4&s=120"></img>
        </label>
      </>
    );
  }
}
