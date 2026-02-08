import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';
import { z } from 'zod';

export const ParamsSchema = z.object({});
export type ParamsInput = z.input<typeof ParamsSchema>;
export type ParamsOutput = z.output<typeof ParamsSchema>;

export const QuerySchema = z.object({});
export type QueryInput = z.input<typeof QuerySchema>;
export type QueryOutput = z.output<typeof QuerySchema>;

@Controller()
export class ControllerPageStyle extends BeanControllerPageBase<ScopeModule, QueryOutput, ParamsOutput> {
  active: boolean;

  protected async __init__() {}
}
