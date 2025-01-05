import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerLayoutEmpty } from './controller.js';
import { ConfigProvider, Layout, StyleProvider } from 'ant-design-vue';
import { RouterView } from 'vue-router';

@Render()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <StyleProvider cache={this.$antdvStyleCache}>
        <ConfigProvider theme={{ token: this.$token }}>
          <Layout class="fill-height">
            <RouterView />
          </Layout>
        </ConfigProvider>
      </StyleProvider>
    );
  }
}
