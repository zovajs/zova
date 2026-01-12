import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerRestPageEntry extends BeanControllerBase {
  protected async __init__() {}

  protected render() {
    return <div>sss</div>;
  }
}
