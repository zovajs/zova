import type { z } from 'zod';
import { createZovaComponentPage } from 'zova';
import { ControllerPageLogin } from '../../page/login/controller.jsx';
import { ControllerPageLoginSchemaQuery } from '../../page/login/controller.jsx';
import { RenderPageLogin } from '../../page/login/render.jsx';

export namespace NSControllerPageLogin {
  export const querySchema = ControllerPageLoginSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPageLoginSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPageLoginSchemaQuery>;

}
declare module 'zova-module-home-user' {
  export interface RenderPageLogin extends ControllerPageLogin {}
}
export const ZPageLogin = createZovaComponentPage(ControllerPageLogin, RenderPageLogin, undefined);
