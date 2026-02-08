import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';

@Render()
export class RenderPage extends BeanRenderBase<ScopeModule> {
  render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
