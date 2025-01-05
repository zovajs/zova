import { BeanControllerPageBase, zz } from 'zova';
import { Local } from 'zova-module-a-bean';

const ParamsSchema = zz.object({});
const QuerySchema = zz.object({});

@Local()
export class ControllerPageStyle extends BeanControllerPageBase {
  active: boolean;

  protected async __init__() {}
}

export interface ControllerPageStyle {
  $params: ControllerPageStyle.ParamsOutput;
  $query: ControllerPageStyle.QueryOutput;
}

export namespace ControllerPageStyle {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
