import type { z } from 'zod';
import { createZovaComponentPage } from 'zova';
import { ControllerPagePaypalCancel } from '../../page/paypalCancel/controller.jsx';
import { ControllerPagePaypalCancelSchemaQuery } from '../../page/paypalCancel/controller.jsx';

export namespace NSControllerPagePaypalCancel {
  export const querySchema = ControllerPagePaypalCancelSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPagePaypalCancelSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPagePaypalCancelSchemaQuery>;

}

export const ZPagePaypalCancel = createZovaComponentPage(ControllerPagePaypalCancel, undefined, undefined);
