import { z } from 'zod';
import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ModelPageRoute } from 'zova-module-a-router';
import { ApiSchemaTestSsrDtoTestResult } from 'zova-module-home-api';

export const ControllerPageToolTwoSchemaParams = z.object({
  id: z.number().optional(),
});

export const ControllerPageToolTwoSchemaQuery = z.object({
  name: z.string().optional(),
});

@Controller()
export class ControllerPageToolTwo extends BeanControllerPageBase {
  @Use()
  $$modelPageRoute: ModelPageRoute;

  protected async __init__() {}

  protected render() {
    const pageData: ApiSchemaTestSsrDtoTestResult | undefined = this.$$modelPageRoute.pageData;
    return (
      <div>
        <div>{`id: ${pageData?.id}`}</div>
        <div>{`name: ${pageData?.name}`}</div>
        <div>{`married: ${pageData?.married}`}</div>
      </div>
    );
  }
}
