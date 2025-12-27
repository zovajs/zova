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
    return (
      <>
        <ZFormField
          {...this.$props}
          render="text"
        ></ZFormField>
        {this.$props.showLog && <div>{`log: ${this.$props.name}`}</div>}
        {this.$props.slotHeader?.({ name: 'kevin' })}
        {this.$slotDefault?.()}
        {this.$props.slotFooter?.({ name: 'jimmy' })}
      </>
    );
  }
}
