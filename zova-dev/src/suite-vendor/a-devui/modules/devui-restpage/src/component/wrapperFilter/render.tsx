import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderWrapperFilter extends BeanRenderBase {
  public render() {
    return (
      <div>
        <label class="input">
          Path
          <input type="text" class="grow" />
        </label>
        <label class="input">
          Path
          <input type="text" class="grow" />
        </label>
      </div>
    );
  }
}
