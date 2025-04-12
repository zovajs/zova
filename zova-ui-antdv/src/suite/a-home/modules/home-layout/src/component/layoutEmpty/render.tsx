import { RouterView } from '@cabloy/vue-router';
import { ConfigProvider, Layout, StyleProvider } from 'ant-design-vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

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
