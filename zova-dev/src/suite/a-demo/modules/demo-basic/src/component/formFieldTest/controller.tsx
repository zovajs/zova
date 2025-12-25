import { BeanControllerBase, IComponentOptions } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';

export interface ControllerFormFieldTestProps extends IFormFieldOptions {
  showLog?: boolean;
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
          render="input"
        ></ZFormField>
        {this.$props.showLog && <div>{`log: ${this.$props.name}`}</div>}
        {this.$slotDefault?.()}
      </>
    );
  }
}
