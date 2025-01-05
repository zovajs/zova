import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleLegacy } from './style.js';
import Counter from '@/components/counter.vue';
import { ZPage } from 'zova-module-home-base';

@Render()
export class RenderPageLegacy extends BeanRenderBase {
  public render() {
    return (
      <ZPage>
        <div>Legacy Vue3 composables/components can be used directly in Zova</div>
        <Counter></Counter>
      </ZPage>
    );
  }
}
