import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { RouterView } from 'vue-router';

export interface ControllerLayoutEmptyProps {}

export type ControllerLayoutEmptyEmits = {};

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
