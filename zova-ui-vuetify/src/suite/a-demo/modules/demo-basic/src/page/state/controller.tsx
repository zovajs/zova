import { VBtn, VBtnGroup, VDivider, VIcon } from 'vuetify/components';
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
        <VBtnGroup variant="elevated">
          <VBtn color="primary" nativeOnClick={() => this.increment()}>
            Increment
          </VBtn>
          <VBtn color="secondary" nativeOnClick={() => this.decrement()}>
            Decrement
          </VBtn>
        </VBtnGroup>
        <VDivider
          color="primary"
          opacity=".7"
          thickness="12"
          variant="double"
          gradient
        ></VDivider>
        <div>
          <VIcon icon={this.icon}></VIcon>
          <VBtn nativeOnClick={() => {
            this.icon = this.icon === '::add' ? ('$cancel' as any) : '::add';
          }}
          >
            Switch
          </VBtn>
        </div>
        <VDivider
          color="primary"
          opacity=".7"
          thickness="12"
          variant="double"
          gradient
        ></VDivider>
        {this._renderAppModals()}
      </ZPage>
    );
  }

  private _renderAppModals() {
    return (
      <VBtnGroup variant="outlined" divided>
        <VBtn nativeOnClick={() => {
          this.$appModal.alert({ type: 'error', text: 'This is a error test' });
        }}
        >
          Alert
        </VBtn>
        <VBtn nativeOnClick={async () => {
        // const res = await this.$performAction('start-actions:confirm', { text: 'Are you sure that you want to delete this one?' });
          const res = await this.$appModal.confirm({ text: 'Are you sure that you want to delete this one?' });
          this.$appModal.alert({ text: String(res) });
        }}
        >
          Confirm
        </VBtn>
      </VBtnGroup>
    );
  }
}
