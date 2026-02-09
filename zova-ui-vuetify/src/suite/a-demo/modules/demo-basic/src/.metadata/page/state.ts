import { createZovaComponentPage } from 'zova';
import { ControllerPageState } from '../../page/state/controller.jsx';
import { RenderPageState } from '../../page/state/render.jsx';

declare module 'zova-module-demo-basic' {
  export interface RenderPageState extends ControllerPageState {}
}
export const ZPageState = createZovaComponentPage(ControllerPageState, RenderPageState, undefined);
