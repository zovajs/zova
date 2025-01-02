import { BeanRenderBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerLayoutEmpty } from './controller.js';
import { RouterView } from 'vue-router';

export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <div>
        <RouterView />
      </div>
    );
  }
}
