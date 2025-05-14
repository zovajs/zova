import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestForm extends BeanRenderBase {
  public render() {
    return <div>form!</div>;
  }
}
