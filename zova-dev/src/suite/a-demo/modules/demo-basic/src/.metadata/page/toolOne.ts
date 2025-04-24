import { createZovaComponentPage } from 'zova';
import { ControllerPageToolOne } from '../../page/toolOne/controller.jsx';
import { RenderPageToolOne } from '../../page/toolOne/render.jsx';

declare module 'zova-module-demo-basic' {
  export interface RenderPageToolOne extends ControllerPageToolOne {}
}
export const ZPageToolOne = createZovaComponentPage(ControllerPageToolOne, RenderPageToolOne, undefined);
