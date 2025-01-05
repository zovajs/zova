import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleIndex } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { ZPage } from 'zova-module-home-base';

@Render()
export class RenderPageIndex extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <ZPage style="text-align: center;">
        <div>
          <div style="font-size: 36px;">Hello Zova</div>
          <div style="font-size: 24px;opacity:.4;">Less is more, while more is less</div>
        </div>
      </ZPage>
    );
  }
}
