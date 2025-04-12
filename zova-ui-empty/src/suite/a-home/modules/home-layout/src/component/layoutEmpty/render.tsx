import { RouterView } from '@cabloy/vue-router';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <div>
        <RouterView />
      </div>
    );
  }
}
