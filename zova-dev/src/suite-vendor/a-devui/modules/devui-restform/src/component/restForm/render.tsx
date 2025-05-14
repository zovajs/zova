import { z } from 'zod';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestForm extends BeanRenderBase {
  public render() {
    return (
      <form bs-form={{ form: this.form }}>
        <input
          bs-formField={{
            name: 'quantity',
            validators: {
              onChange: z.string().min(3),
            },
          }}
        ></input>
      </form>
    );
  }
}
