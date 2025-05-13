import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestTable extends BeanRenderBase {
  public render() {
    return <div>table</div>;
  }
}
