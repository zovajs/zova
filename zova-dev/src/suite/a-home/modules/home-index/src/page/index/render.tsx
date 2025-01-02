import { BeanRenderBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { StyleIndex } from './style.js';

export interface RenderIndex extends StyleIndex {}

@Local()
export class RenderIndex extends BeanRenderBase {
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
