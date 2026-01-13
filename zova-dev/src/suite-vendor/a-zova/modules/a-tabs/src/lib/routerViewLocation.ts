import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import { createVNode, defineComponent, provide, ref } from 'vue';
import { routerViewLocationKey } from 'vue-router';

export interface IRouterViewLocationProps {
  component: any;
  route: RouteLocationNormalizedLoadedGeneric;
}

export const RouterViewLocation = defineComponent(
  (props: IRouterViewLocationProps) => {
    const route = ref(props.route);
    provide(routerViewLocationKey, route);
    return () => {
      return createVNode(props.component);
    };
  },
  {
    props: ['component', 'route'],
  },
);
