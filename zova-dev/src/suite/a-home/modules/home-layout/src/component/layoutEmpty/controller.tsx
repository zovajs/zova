import { RouterView } from 'vue-router';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerLayoutEmptyProps {}

export interface ControllerLayoutEmptyEmits {}

export interface ControllerLayoutEmptySlots {}

@Controller()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};

  protected render() {
    return (
      <div>
        <RouterView />
      </div>
    );
  }
}
