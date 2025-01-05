import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerLayoutEmpty } from './controller.js';
import { ElConfigProvider, ElContainer, ElMain } from 'element-plus';
import { RouterView } from 'vue-router';

@Render()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <ElConfigProvider>
        <ElContainer>
          <ElMain>
            <RouterView />
          </ElMain>
        </ElContainer>
      </ElConfigProvider>
    );
  }
}
