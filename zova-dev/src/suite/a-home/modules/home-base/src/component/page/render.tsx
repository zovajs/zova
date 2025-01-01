import { BeanRenderBase, Local } from 'zova';
import type { StylePage } from './style.js';

export interface RenderPage extends StylePage {}

@Local()
export class RenderPage extends BeanRenderBase {
  render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
