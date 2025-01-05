import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerCard } from './controller.js';
import { ElButton } from 'element-plus';

@Render()
export class RenderCard extends BeanRenderBase {
  render() {
    return (
      <div>
        <ElButton
          onClick={() => {
            this.$emit('reset', new Date());
          }}
        >
          Reset Time
        </ElButton>
        <div>
          <div style={{ backgroundColor: 'teal' }}>
            <div>
              <div>Slot:</div>
              {this.$slots.header?.()}
            </div>
            <div>{`Prop: ${this.$props.header}`}</div>
          </div>
          <div style={{ backgroundColor: 'orange' }}>
            <div>
              <div>Slot:</div>
              {this.$slots.default?.()}
            </div>
            <div>{`Prop: ${this.$props.content}`}</div>
          </div>
          <div style={{ backgroundColor: 'green' }}>
            <div>
              <div>Slot</div>
              {this.$slots.footer?.()}
            </div>
            <div>{`Prop: ${this.$props.footer}`}</div>
          </div>
        </div>
      </div>
    );
  }
}
