import { BeanControllerPageBase, zz } from 'zova';
import { Controller } from 'zova-module-a-bean';

export const ControllerPageRouteQuerySchemaParams = zz.object({});

export const ControllerPageRouteQuerySchemaQuery = zz.object({
  name: zz.string().optional(),
  age: zz.number().optional(),
});

@Controller()
export class ControllerPageRouteQuery extends BeanControllerPageBase {
  protected async __init__() {}
}
