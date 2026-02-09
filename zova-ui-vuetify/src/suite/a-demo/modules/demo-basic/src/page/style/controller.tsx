import { VBtn } from 'vuetify/components/VBtn';
import { VRadio } from 'vuetify/components/VRadio';
import { VRadioGroup } from 'vuetify/components/VRadioGroup';
import { BeanControllerPageBase, useComputed } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $getThemeName } from 'zova-module-a-style';
import { ZPage } from 'zova-module-home-base';

@Controller()
export class ControllerPageStyle extends BeanControllerPageBase {
  active: boolean;
  cTextColor: string;
  themeDarkOptions = [
    { label: 'Light', value: false },
    { label: 'Dark', value: true },
    { label: 'Auto', value: 'auto' },
  ];

  themeNameOptions = [
    {
      label: 'Default',
      value: $getThemeName('home-base:default'),
    },
    { label: 'Orange', value: $getThemeName('demo-basic:orange') },
  ];

  protected async __init__() {
    this.cTextColor = useComputed(() => {
      return this.$style({ color: this.active ? this.$token.colors.primary : '' });
    });
  }

  protected render() {
    return (
      <ZPage class={this.$css.textCenter}>
        <div class={this.cTextColor}>Hello World</div>
        <VBtn
          nativeOnClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </VBtn>
        <hr></hr>
        <div>
          <VRadioGroup v-model={this.$theme.darkMode} inline>
            <VRadio label="Light" value={false}></VRadio>
            <VRadio label="Dark" value={true}></VRadio>
            <VRadio label="Auto" value="auto"></VRadio>
          </VRadioGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token.colors.primary }}>
            theme:
            {this.$theme.name}
          </div>
          <VRadioGroup v-model={this.$theme.name} inline>
            <VRadio label="Default" value={$getThemeName('home-base:default')}></VRadio>
            <VRadio label="Orange" value={$getThemeName('demo-basic:orange')}></VRadio>
          </VRadioGroup>
        </div>
      </ZPage>
    );
  }
}
