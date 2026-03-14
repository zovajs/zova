import type { RenderLayoutTabs } from './render.jsx';
import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZRouterViewEmpty } from 'zova-module-a-router';
// import { ZRouterViewTabs } from 'zova-module-a-routertabs';

@Render()
export class RenderContent extends BeanRenderBase {
  @Use()
  $$r: RenderLayoutTabs;

  public render() {
    return (
      <ZRouterViewEmpty></ZRouterViewEmpty>
    );
    // return (
    //   <ZRouterViewTabs></ZRouterViewTabs>
    // );
  }
}
