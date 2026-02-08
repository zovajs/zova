import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';

@Render()
export class RenderPageIndex extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div style="text-align: center;">
        <div>
          <div style="font-size: 36px;">Hello Zova</div>
          <div style="font-size: 24px;opacity:.4;">Less is more, while more is less</div>
        </div>
      </div>
    );
  }
}
