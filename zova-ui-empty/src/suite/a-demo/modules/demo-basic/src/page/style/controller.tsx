import { QBtn, QOptionGroup, QPage } from 'quasar';
import { BeanControllerPageBase, useComputed } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $getThemeName } from 'zova-module-a-style';

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
      return this.$style({ color: this.active ? this.$token.color.primary : '' });
    });
  }

  protected render() {
    return (
      <QPage padding class={this.$css.textCenter}>
        <div class={this.cTextColor}>Hello World</div>
        <QBtn
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </QBtn>
        <hr></hr>
        <div>
          <QOptionGroup
            options={this.themeDarkOptions}
            type="radio"
            inline
            v-model={this.$theme.darkMode}
          ></QOptionGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token.color.primary }}>
            theme:
            {this.$theme.name}
          </div>
          <QOptionGroup options={this.themeNameOptions} type="radio" inline v-model={this.$theme.name}></QOptionGroup>
        </div>
      </QPage>
    );
  }
}
