import { createZovaComponentPage } from 'zova';
import { ControllerPageErrorNotFound } from '../../page/errorNotFound/controller.jsx';
import { RenderPageErrorNotFound } from '../../page/errorNotFound/render.jsx';
import { StylePageErrorNotFound } from '../../page/errorNotFound/style.js';

declare module 'zova-module-home-base' {
  export interface StylePageErrorNotFound extends ControllerPageErrorNotFound {}
  export interface RenderPageErrorNotFound extends StylePageErrorNotFound {}
}
export const ZPageErrorNotFound = createZovaComponentPage(ControllerPageErrorNotFound, RenderPageErrorNotFound, StylePageErrorNotFound);
