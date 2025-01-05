import { BeanControllerPageBase, zz } from 'zova';
import { Controller } from 'zova-module-a-bean';

export const ControllerPageRouteParamsSchemaParams = zz.object({
  id: zz.number().optional().default(0),
});
export const ControllerPageRouteParamsSchemaQuery = zz.object({});

@Controller()
export class ControllerPageRouteParams extends BeanControllerPageBase {
  protected async __init__() {}
}

// export interface ControllerPageRouteParams {
//   $params: ControllerPageRouteParams.ParamsOutput;
//   $query: ControllerPageRouteParams.QueryOutput;
// }

// export namespace NSControllerPageRouteParams {
//   export const paramsSchema = ControllerPageRouteParamsSchemaParams;
//   export type ParamsInput = zz.input<typeof ParamsSchema>;
//   export type ParamsOutput = zz.output<typeof ParamsSchema>;

//   export const querySchema = QuerySchema;
//   export type QueryInput = zz.input<typeof QuerySchema>;
//   export type QueryOutput = zz.output<typeof QuerySchema>;
// }

// export namespace ControllerPageRouteParams {
//   export const paramsSchema = ParamsSchema;
//   export type ParamsInput = zz.input<typeof ParamsSchema>;
//   export type ParamsOutput = zz.output<typeof ParamsSchema>;

//   export const querySchema = QuerySchema;
//   export type QueryInput = zz.input<typeof QuerySchema>;
//   export type QueryOutput = zz.output<typeof QuerySchema>;
// }
