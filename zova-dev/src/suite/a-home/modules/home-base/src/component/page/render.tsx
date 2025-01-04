import { BeanRenderBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { StylePage } from './style.js';

export interface RenderPage extends StylePage {}

@Local()
export class RenderPage extends BeanRenderBase {
  public render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
