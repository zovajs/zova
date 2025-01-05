import { BeanRenderBase, getBeanName } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ScopeModule } from '../../.metadata/this.js';
import { ElButton, ElRadio, ElRadioGroup } from 'element-plus';

@Render()
export class RenderPageStyle extends BeanRenderBase<ScopeModule> {
  render() {
    return (
      <div class={this.$css.textCenter}>
        <div class={this.cTextColor}>Hello World</div>
        <ElButton
          onClick={() => {
            this.active = !this.active;
          }}
        >
          Switch Active
        </ElButton>
        <hr></hr>
        <div>
          <ElRadioGroup v-model={this.$theme.darkMode}>
            <ElRadio value={false}>Light</ElRadio>
            <ElRadio value={true}>Dark</ElRadio>
            <ElRadio value={'auto'}>Auto</ElRadio>
          </ElRadioGroup>
        </div>
        <hr></hr>
        <div>
          <div style={{ color: this.$token['color-primary'] }}>theme: {this.$theme.name}</div>
          <ElRadioGroup v-model={this.$theme.name}>
            <ElRadio value={getBeanName('home-base.theme.default')}>Default</ElRadio>
            <ElRadio value={getBeanName('demo-basic.theme.orange')}>Orange</ElRadio>
          </ElRadioGroup>
        </div>
      </div>
    );
  }
}
