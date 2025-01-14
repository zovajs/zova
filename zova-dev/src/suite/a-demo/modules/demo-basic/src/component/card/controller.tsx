import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { VNode } from 'vue';

export interface ControllerCardProps {
  header?: string;
  content?: string;
  footer?: string;
}

export type ControllerCardEmits = {
  (e: 'reset', time: Date): void;
};

export interface ControllerCardSlots {
  header?(): VNode;
  default?(): VNode;
  footer?(): VNode;
}

@Controller()
export class ControllerCard extends BeanControllerBase {
  static $propsDefault = {
    header: 'default header',
  };

  protected render() {
    return (
      <div>
        <button
          class="btn btn-primary"
          onClick={() => {
            this.$emit('reset', new Date());
          }}
        >
          Reset Time
        </button>
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
