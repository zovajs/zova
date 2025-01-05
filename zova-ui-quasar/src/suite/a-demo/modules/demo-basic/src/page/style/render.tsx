import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { StyleStyle } from './style.js';
import { ScopeModule } from '../../.metadata/this.js';
import { QBtn, QOptionGroup, QPage } from 'quasar';

@Render()
export class RenderStyle extends BeanRenderBase<ScopeModule> {
  render() {
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
          <div style={{ color: this.$token.color.primary }}>theme: {this.$theme.name}</div>
          <QOptionGroup options={this.themeNameOptions} type="radio" inline v-model={this.$theme.name}></QOptionGroup>
        </div>
      </QPage>
    );
  }
}
