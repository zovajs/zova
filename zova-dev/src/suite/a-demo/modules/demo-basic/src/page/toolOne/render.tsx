import { z } from 'zod';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageToolOne extends BeanRenderBase {
  public render() {
    return (
      <div>
        <form bs-form={{ form: this.form }}>
          <input bs-formField={{
            name: 'name',
            validators: {
              onChange: z.string().min(3),
            },
          }}
          ></input>
          <this.form.Field name="name">
            {
              ({ field }) => {
                console.log(field.state.meta);
                return (
                  <input
                    name={field.name}
                    value={field.state.value}
                    onInput={e => field.handleChange((e.target as any).value)}
                  ></input>
                );
              }
            }
          </this.form.Field>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
