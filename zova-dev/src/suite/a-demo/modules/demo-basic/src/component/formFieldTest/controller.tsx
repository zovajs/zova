import { VNode } from 'vue';
import { BeanControllerBase, IComponentOptions } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';

export interface ControllerFormFieldTestProps extends IFormFieldOptions {
  showLog?: boolean;
  slotHeader?: (scope: { name: string }) => VNode;
  slotFooter?: (scope: { name: string }) => VNode;
}

@Controller()
export class ControllerFormFieldTest extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    const domField = this.$slotDefault
      ? this.$slotDefault()
      : (
          <ZFormField
            name={this.$props.name}
            render="text"
          ></ZFormField>
        );
    return (
      <>
        {this.$props.slotHeader?.({ name: 'kevin' })}
        {domField}
        {this.$props.showLog && <div>{`log: ${this.$props.name}`}</div>}
        {this.$props.slotFooter?.({ name: 'jimmy' })}
      </>
    );
  }
}
