import type { VNode } from 'vue';
import type { IComponentOptions } from 'zova';
import type { IFormFieldComponentOptions } from 'zova-module-a-form';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormFieldWrapper } from 'zova-module-a-form';

export interface ControllerFormFieldTestProps extends IFormFieldComponentOptions {
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
    const domField = this.$slotDefault ? this.$slotDefault() : <ZFormFieldWrapper {...this.$props} render="input"></ZFormFieldWrapper>;
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
