import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import Counter from '@/components/counter.vue';
import { ZPage } from 'zova-module-home-base';

@Controller()
export class ControllerPageLegacy extends BeanControllerPageBase {
  protected async __init__() {}

  protected render() {
    return (
      <ZPage>
        <div>Legacy Vue3 composables/components can be used directly in Zova</div>
        <Counter></Counter>
      </ZPage>
    );
  }
}
