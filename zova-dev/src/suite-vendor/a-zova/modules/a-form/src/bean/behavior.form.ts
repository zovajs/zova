import { createCommentVNode, VNode } from 'vue';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { ReturnTypeUseForm } from '../types/form.js';

export interface IBehaviorPropsInputForm {
  onSubmit?: ((payload: Event) => void);
}

export interface IBehaviorPropsOutputForm {}

export interface IBehaviorOptionsForm<TFormData = unknown> extends IDecoratorBehaviorOptions {
  form?: ReturnTypeUseForm<TFormData>;
  onSubmit?: ((payload: Event) => void) | boolean;
}

@Behavior<IBehaviorOptionsForm>()
export class BehaviorForm extends BeanBehaviorBase<
  IBehaviorOptionsForm,
  IBehaviorPropsInputForm,
  IBehaviorPropsOutputForm
> {
  protected async __init__(options: IBehaviorOptionsForm) {
    super.__init__(options);
    this.bean._setBean('$$form', this.$options.form);
  }

  protected async onOptionsChange(options: IBehaviorOptionsForm) {
    super.onOptionsChange(options);
    this.bean._setBean('$$form', this.$options.form);
  }

  protected render(props: IBehaviorPropsInputForm, next: NextBehavior<IBehaviorPropsOutputForm>): VNode {
    if (!this.$options.form) return createCommentVNode();
    if (!props.onSubmit && this.$options.onSubmit !== false) {
      props = Object.assign({}, props, {
        onSubmit: typeof this.$options.onSubmit === 'function'
          ? this.$options.onSubmit
          : (e: Event) => {
              e.preventDefault();
              e.stopPropagation();
              this.$options.form?.handleSubmit();
            },
      });
    }
    return next(props);
  }
}
