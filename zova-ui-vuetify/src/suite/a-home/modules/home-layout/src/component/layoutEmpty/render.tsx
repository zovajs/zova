import { RouterView } from '@cabloy/vue-router';
import { VApp, VMain } from 'vuetify/components';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <VApp>
        <VMain>
          <RouterView />
        </VMain>
      </VApp>
    );
  }
}
