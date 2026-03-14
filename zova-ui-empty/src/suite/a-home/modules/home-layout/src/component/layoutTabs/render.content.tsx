import type { RenderLayoutTabs } from './render.jsx';
import { RouterView } from '@cabloy/vue-router';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderContent extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutTabs;

  public render() {
    return <RouterView />;
  }
}
