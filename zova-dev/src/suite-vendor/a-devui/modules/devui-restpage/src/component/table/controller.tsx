import { BeanControllerBase, Functionable, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ControllerPageResource } from 'zova-module-a-rest';

export interface ControllerTableProps {
  onOperationCreate: Functionable;
}

@Controller()
export class ControllerTable extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$restResource: ControllerPageResource;

  protected async __init__() {
    // dataFindAll
    const queryDataFindAll = this.$$restResource.getQueryDataFindAll();
    await queryDataFindAll.suspense();
  }

  onOperationCreate() {
    return this.$props.onOperationCreate();
  }
}
