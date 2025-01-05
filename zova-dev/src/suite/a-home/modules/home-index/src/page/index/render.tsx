import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleIndex } from './style.js';

@Render()
export class RenderPageIndex extends BeanRenderBase {
  public render() {
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
