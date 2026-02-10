import { VBtn, VIcon } from 'vuetify/components';
import { BeanControllerPageBase, useComputed } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IIconRecord } from 'zova-module-a-icon';
import { ZPage } from 'zova-module-home-base';

@Controller()
export class ControllerPageState extends BeanControllerPageBase {
  count: number = 0;
  count2: string;
  icon: keyof IIconRecord;

  protected async __init__() {
    this.count2 = useComputed(() => {
      return `=== ${this.count} ===`;
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  protected render() {
    return (
      <ZPage>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <VBtn color="primary" nativeOnClick={() => this.increment()}>
          Increment
        </VBtn>
        <VBtn color="secondary" nativeOnClick={() => this.decrement()}>
          Decrement
        </VBtn>
        <div>
          <VIcon icon={this.icon}></VIcon>
          <VBtn nativeOnClick={() => {
            this.icon = this.icon === '::add' ? ('$cancel' as any) : '::add';
          }}
          >
            Switch
          </VBtn>
        </div>
      </ZPage>
    );
  }
}
