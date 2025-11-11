import type { BehaviorForm } from '../../bean/behavior.form.jsx';
import { VNode } from 'vue';
import { BeanControllerBase, deepExtend, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $UseBehaviorTag, BeanBehaviorsHolder, IBehaviorItem } from 'zova-module-a-behavior';
import { BehaviorFormField } from '../../bean/behavior.formField.js';
import { IBehaviorPropsOutputFormFieldModel } from '../../bean/behavior.formFieldModel.js';
import { TypeFormField } from '../../types/form.js';
import { IBehaviorPropsOutputFormFieldLayoutBase, IFormFieldLayoutOptionsBase, IFormFieldOptions } from '../../types/formField.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormFieldProps<TParentData = unknown> extends IFormFieldOptions<TParentData>, IFormFieldLayoutOptionsBase {
  behaviors?: IBehaviorItem;
  formProvider?: IFormProvider;
  slotDefault?: (props: IBehaviorPropsOutputFormFieldModel & IBehaviorPropsOutputFormFieldLayoutBase, field: TypeFormField<TParentData>) => VNode;
}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  formProvider: IFormProvider;

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  @Use()
  $$beanBehaviorsHolder: BeanBehaviorsHolder;

  protected async __init__() {
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$behaviorForm.formProvider, this.$props.formProvider);
    });
    await this.$$beanBehaviorsHolder.initialize({
      behaviorTag: $UseBehaviorTag(this._getFieldComponent()),
      behaviors: () => {
        return this._getFieldBehaviors();
      },
    });
  }

  protected render() {
    return this.$$beanBehaviorsHolder.render(
      this.$slotDefault
        ? (props: object) => {
            const behaviorFormField: BehaviorFormField = this.bean._getBeanFromHost({ name: '$$behaviorFormField', injectionScope: 'host' });
            return this.$slotDefault!(props, behaviorFormField.field);
          }
        : undefined,
    );
  }

  private _getFieldName(): string {
    return this.$props.name;
  }

  private _getFieldProperty() {
    const name = this._getFieldName();
    return this.$$behaviorForm.getProperty(name);
  }

  private _getFieldZodSchema() {
    const name = this._getFieldName();
    return this.$$behaviorForm.getFieldZodSchema(name);
  }

  private _getFieldComponent() {
    const property = this._getFieldProperty();
    let render = this.$props.render ?? property?.rest?.render ?? 'text';
    if (typeof render === 'string') {
      render = this.formProvider.components?.[render] ?? render;
    }
    if (typeof render === 'function') return render;
    if (typeof render === 'string' && render.includes(':')) return this.$zovaComponent(render as any);
    return render;
  }

  private _getFieldBehaviors() {
    const behaviors: IBehaviorItem = {};
    this._prepareBehaviorFormField(behaviors);
    this._prepareBehaviorFormFieldLayout(behaviors);
    return this.$props.behaviors ? deepExtend(behaviors, this.$props.behaviors) : behaviors;
  }

  private _prepareBehaviorFormField(behaviors: IBehaviorItem) {
    const behaviorFormField = this.formProvider.behaviors?.formField;
    if (!behaviorFormField) return;
    behaviors[behaviorFormField] = this.getBehaviorFormFieldOptions();
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem) {
    const behaviorFormFieldLayout = this.formProvider.behaviors?.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = this.getBehaviorFormFieldLayoutOptions();
  }

  private getBehaviorFormFieldOptions() {
    const name = this._getFieldName();
    const zodSchemaField = this._getFieldZodSchema();
    const validateOnBlurDefault = this.$props.validateOnBlur === undefined && this.$props.validateOnChange === undefined;
    const validateOnBlur = this.$props.validateOnBlur ?? validateOnBlurDefault;
    const validateOnChange = this.$props.validateOnChange;
    return deepExtend({}, this.$$behaviorForm.formField, this.$props as any, {
      name,
      validators: {
        onBlur: validateOnBlur && zodSchemaField,
        onChange: validateOnChange && zodSchemaField,
      },
      formProvider: this.formProvider,
    });
  }

  private getBehaviorFormFieldLayoutOptions() {
    const name = this._getFieldName();
    const property = this._getFieldProperty();
    return deepExtend({ bordered: true }, this.$$behaviorForm.formFieldLayout, this.$props as any, {
      label: this.$props.label ?? property?.title ?? name,
    } satisfies IFormFieldLayoutOptionsBase);
  }
}
