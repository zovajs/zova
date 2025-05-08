import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPageToolOne extends BeanRenderBase {
  public render() {
    return (
      <div>
        <form bs-form={{ form: this.form }}>
          <input bs-formItem={{ name: 'name' }}></input>
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
