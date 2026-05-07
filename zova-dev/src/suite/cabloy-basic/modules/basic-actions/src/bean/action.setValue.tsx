import { BeanBase, cast } from 'zova';
import { Action, IActionExecute, IActionOptionsBase, NextActionExecute } from 'zova-module-a-action';
import { IJsxRenderContextFormField } from 'zova-module-a-form';
import { IJsxRenderContextBase } from 'zova-module-a-openapi';

export type TypeActionSetValueResult = unknown;

export interface IActionOptionsSetValue extends IActionOptionsBase<TypeActionSetValueResult> {
  name?: string;
  value?: any;
  disableNotifyChanged?: boolean;
}

@Action<IActionOptionsSetValue>()
export class ActionSetValue extends BeanBase implements IActionExecute {
  execute(options: IActionOptionsSetValue, renderContext: IJsxRenderContextBase, next: NextActionExecute) {
    if (renderContext.$scene === 'formField') {
      const { $celScope, $jsx, $$form } = renderContext as IJsxRenderContextFormField;
      const name = options.name ?? $celScope.name;
      // null means valid prop value
      const value = options.value !== undefined ? options.value : cast($jsx.event?.target)?.value;
      $$form.setFieldValue(name, value, options.disableNotifyChanged);
    }
    return next();
  }
}
