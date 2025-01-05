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
