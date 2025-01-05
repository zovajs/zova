import { BeanControllerPageBase, zz } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';

export const ParamsSchema = zz.object({});
export type ParamsInput = zz.input<typeof ParamsSchema>;
export type ParamsOutput = zz.output<typeof ParamsSchema>;

export const QuerySchema = zz.object({});
export type QueryInput = zz.input<typeof QuerySchema>;
export type QueryOutput = zz.output<typeof QuerySchema>;

@Controller()
export class ControllerPageStyle extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  active: boolean;

  protected async __init__() {}
}
