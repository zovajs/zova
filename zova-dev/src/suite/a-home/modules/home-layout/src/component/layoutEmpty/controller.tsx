import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZRouterViewEmpty } from 'zova-module-a-router';
import { ServiceSsr } from '../../service/ssr.js';

export interface ControllerLayoutEmptyProps {}

@Controller()
export class ControllerLayoutEmpty extends BeanControllerBase {
  static $propsDefault = {};

  @Use()
  $$ssr: ServiceSsr;

  protected render() {
    return (
      <ZRouterViewEmpty></ZRouterViewEmpty>
    );
  }
}
