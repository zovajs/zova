import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerLayoutEmpty } from './controller.js';
import { RouterView } from 'vue-router';

@Render()
export class RenderLayoutEmpty extends BeanRenderBase {
  public render() {
    return (
      <div>
        <RouterView />
      </div>
    );
  }
}
