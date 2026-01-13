import { provide, ref } from 'vue';
import { RouteLocationNormalizedLoadedGeneric, routerViewLocationKey } from 'vue-router';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerRouterViewLocationProps {
  component: any;
  route: RouteLocationNormalizedLoadedGeneric;
}

@Controller()
export class ControllerRouterViewLocation extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {
    const route = ref(this.$props.route);
    provide(routerViewLocationKey, route);
  }

  protected render() {
    const Component = this.$props.component;
    return <Component></Component>;
  }
}
