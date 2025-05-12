import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPage extends BeanRenderBase {
  public render() {
    return <div>page</div>;
  }
}
