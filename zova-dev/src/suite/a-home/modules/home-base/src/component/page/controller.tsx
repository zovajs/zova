import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { JSX } from 'vue/jsx-runtime';

export interface ControllerPageProps {}

export type ControllerPageEmits = {};

export interface ControllerPageSlots {
  default?(): JSX.Element;
}

@Controller()
export class ControllerPage extends BeanControllerBase {
  static $propsDefault = {};

  cPage: string;

  protected async __init__() {
    this.cPage = this.$style({
      padding: '16px',
    });
  }

  protected render() {
    return <div class={this.cPage}>{this.$slots.default?.()}</div>;
  }
}
