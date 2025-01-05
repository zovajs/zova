import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPage extends BeanRenderBase {
  public render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
