import { BeanControllerPageBase, Local, Use, zz } from 'zova';
import { StoreCounter } from '../../bean/store.counter.js';

const ParamsSchema = zz.object({});
const QuerySchema = zz.object({});

@Local()
export class ControllerPagePinia extends BeanControllerPageBase {
  @Use()
  $$counter: StoreCounter;

  protected async __init__() {}
}

export interface ControllerPagePinia {
  $params: ControllerPagePinia.ParamsOutput;
  $query: ControllerPagePinia.QueryOutput;
}

export namespace ControllerPagePinia {
  export const paramsSchema = ParamsSchema;
  export type ParamsInput = zz.input<typeof ParamsSchema>;
  export type ParamsOutput = zz.output<typeof ParamsSchema>;

  export const querySchema = QuerySchema;
  export type QueryInput = zz.input<typeof QuerySchema>;
  export type QueryOutput = zz.output<typeof QuerySchema>;
}
