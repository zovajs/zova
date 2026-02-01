import { createZovaComponentPage } from 'zova';
import { ControllerPageStyle } from '../../page/style/controller.jsx';
import { RenderPageStyle } from '../../page/style/render.jsx';
import { StylePageStyle } from '../../page/style/style.js';

declare module 'zova-module-demo-basic' {
  export interface StylePageStyle extends ControllerPageStyle {}
  export interface RenderPageStyle extends StylePageStyle {}
}
export const ZPageStyle = createZovaComponentPage(ControllerPageStyle, RenderPageStyle, StylePageStyle);
