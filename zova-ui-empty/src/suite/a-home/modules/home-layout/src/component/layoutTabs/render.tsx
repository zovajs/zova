import { BeanRenderBase, Use } from 'zova';
import { Render } from 'zova-module-a-bean';

import { RenderContent } from './render.content.jsx';
import { RenderMenu } from './render.menu.jsx';

@Render()
export class RenderLayoutTabs extends BeanRenderBase {
  @Use()
  $$renderContent: RenderContent;

  @Use()
  $$renderMenu: RenderMenu;

  public render() {
    return (
      <div>
        {this.$$renderMenu.render()}
        <div>{this.$$renderContent.render()}</div>
      </div>
    );
  }
}
