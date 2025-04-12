import { RouterView } from '@cabloy/vue-router';
import { ElConfigProvider, ElContainer, ElMain } from 'element-plus';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

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
