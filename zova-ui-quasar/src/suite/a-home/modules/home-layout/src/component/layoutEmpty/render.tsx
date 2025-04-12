import { RouterView } from '@cabloy/vue-router';
import { QLayout, QPageContainer } from 'quasar';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <QLayout>
        <QPageContainer>
          <RouterView />
        </QPageContainer>
      </QLayout>
    );
  }
}
