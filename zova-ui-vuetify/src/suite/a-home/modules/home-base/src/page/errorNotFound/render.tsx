import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleErrorNotFound } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { VBtn } from 'vuetify/components';

@Render()
export class RenderPageErrorNotFound extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class="text-center">
        <div>
          <div style="font-size: 30vh">404</div>

          <div style="font-size: 30px;line-height:2;opacity:.4">Oops. Nothing here...</div>

          <VBtn rounded elevation={12} ripple text="Go Home" to="/" />
        </div>
      </div>
    );
  }
}
