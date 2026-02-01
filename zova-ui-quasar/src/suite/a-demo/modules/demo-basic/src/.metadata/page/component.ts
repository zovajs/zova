import { createZovaComponentPage } from 'zova';
import { ControllerPageComponent } from '../../page/component/controller.jsx';
import { RenderPageComponent } from '../../page/component/render.jsx';

declare module 'zova-module-demo-basic' {
  export interface RenderPageComponent extends ControllerPageComponent {}
}
export const ZPageComponent = createZovaComponentPage(ControllerPageComponent, RenderPageComponent, undefined);
