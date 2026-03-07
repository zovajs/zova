import type { z } from 'zod';
import { createZovaComponentPage } from 'zova';
import { ControllerPagePaypalReturn } from '../../page/paypalReturn/controller.jsx';
import { ControllerPagePaypalReturnSchemaQuery } from '../../page/paypalReturn/controller.jsx';

export namespace NSControllerPagePaypalReturn {
  export const querySchema = ControllerPagePaypalReturnSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPagePaypalReturnSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPagePaypalReturnSchemaQuery>;

}

export const ZPagePaypalReturn = createZovaComponentPage(ControllerPagePaypalReturn, undefined, undefined);
