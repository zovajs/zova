import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { QLayout, QPageContainer } from 'quasar';
import { RouterView } from 'vue-router';

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
