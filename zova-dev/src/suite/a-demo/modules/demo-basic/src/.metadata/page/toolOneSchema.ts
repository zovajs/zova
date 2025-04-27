import type { z } from 'zod';
import { createZovaComponentPage } from 'zova';
import { ControllerPageToolOneSchema } from '../../page/toolOneSchema/controller.jsx';
import { ControllerPageToolOneSchemaSchemaQuery } from '../../page/toolOneSchema/controller.jsx';
import { RenderPageToolOneSchema } from '../../page/toolOneSchema/render.jsx';

export namespace NSControllerPageToolOneSchema {
  export const querySchema = ControllerPageToolOneSchemaSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPageToolOneSchemaSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPageToolOneSchemaSchemaQuery>;

}
declare module 'zova-module-demo-basic' {
  export interface RenderPageToolOneSchema extends ControllerPageToolOneSchema {}
}
export const ZPageToolOneSchema = createZovaComponentPage(ControllerPageToolOneSchema, RenderPageToolOneSchema, undefined);
