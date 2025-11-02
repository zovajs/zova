import type { BehaviorForm } from '../../bean/behavior.form.jsx';
import { BeanControllerBase, deepExtend, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $UseBehaviorTag, BeanBehaviorsHolder, IBehaviorItem } from 'zova-module-a-behavior';
import { BehaviorFormField } from '../../bean/behavior.formField.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptions } from '../../types/formField.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormFieldProps<TParentData = unknown> extends IFormFieldOptions<TParentData>, IFormFieldLayoutOptionsBase {
  formProvider?: IFormProvider;
}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};

  formProvider: IFormProvider;

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  @Use()
  $$beanBehaviorsHolder: BeanBehaviorsHolder;

  protected async __init__() {
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$behaviorForm.formProvider, this.$props.formProvider);
    });
    await this.$$beanBehaviorsHolder.init({
      behaviorTag: $UseBehaviorTag(this._getFieldComponent()),
      behaviors: () => {
        return this._getFieldBehaviors();
      },
    });
  }

  protected render() {
    return this.$$beanBehaviorsHolder.render(
      this.$slots.default
        ? () => {
            const behaviorFormField: BehaviorFormField = this.bean._getBeanFromHost({ name: '$$behaviorFormField', injectionScope: 'host' });
            return this.$slots.default!(behaviorFormField.field);
          }
        : undefined,
    );
  }

  private _getFieldName() {
    return this.$props.name;
  }

  private _getFieldProperty() {
    return this.$$behaviorForm.getProperty(this._getFieldName());
  }

  private _getFieldZodSchema() {
    return this.$$behaviorForm.getFieldZodSchema(this._getFieldName());
  }

  private _getFieldComponent() {
    const property = this._getFieldProperty();
    let render = property?.rest?.render ?? 'text';
    if (typeof render === 'string') {
      render = this.formProvider.components?.[render] ?? (render.includes(':') ? render : 'input');
    }
    if (typeof render === 'function') return render;
    if (render.includes(':')) return this.$zovaComponent(render as any);
    return render;
  }

  private _getFieldBehaviors() {
    const behaviors: IBehaviorItem = {};
    this._prepareBehaviorFormField(behaviors);
    this._prepareBehaviorFormFieldLayout(behaviors);
    return behaviors;
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
    return deepExtend({}, this.$$behaviorForm.formField, this.$props as any, {
      name,
      validators: {
        onChange: zodSchemaField,
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
