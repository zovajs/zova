import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { VApp, VMain } from 'vuetify/components';
import { RouterView } from 'vue-router';

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
