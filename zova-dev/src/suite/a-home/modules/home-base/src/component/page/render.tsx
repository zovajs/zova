import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StylePage } from './style.js';

@Render()
export class RenderPage extends BeanRenderBase {
  public render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
