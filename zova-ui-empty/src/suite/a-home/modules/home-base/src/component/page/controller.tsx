import { BeanControllerBase, PropsBase, RequiredSome } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';
import { JSX } from 'vue/jsx-runtime';

export interface Props extends PropsBase<ControllerPage, Slots> {}

export type Emits = {};

export interface Slots {
  default?(): JSX.Element;
}

@Controller()
export class ControllerPage extends BeanControllerBase<
  ScopeModule,
  RequiredSome<Props, keyof typeof ControllerPage.$propsDefault>,
  Emits,
  Slots
> {
  static $propsDefault = {};

  protected async __init__() {}
}
