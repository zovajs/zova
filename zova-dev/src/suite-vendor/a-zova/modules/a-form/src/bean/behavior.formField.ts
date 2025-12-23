import type { ControllerForm } from '../component/form/controller.jsx';
import { useField } from '@tanstack/vue-form';
import { VNode } from 'vue';
import { deepExtend, disposeInstance, Use } from 'zova';
import { BeanBehaviorBase, Behavior, IBehaviors, IDecoratorBehaviorOptions, NextBehavior, ServiceComposer } from 'zova-module-a-behavior';
import { TypeFormField } from '../types/form.js';
import { IFormFieldOptions } from '../types/formField.js';
import { IFormProvider } from '../types/provider.js';

export interface IBehaviorPropsInputFormField {}

export interface IBehaviorPropsOutputFormField {}

export interface IBehaviorOptionsFormField<TParentData = unknown>
  extends IDecoratorBehaviorOptions, IFormFieldOptions<TParentData> {
  formProvider?: IFormProvider;
}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<
  IBehaviorOptionsFormField,
  IBehaviorPropsInputFormField,
  IBehaviorPropsOutputFormField
> {
  private _field: TypeFormField;
  private _composer?: ServiceComposer;

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected async __init__(options: IBehaviorOptionsFormField) {
    // provide
    this.bean._setBean('$$behaviorFormField', this);
    // field
    this._field = useField({ ...options, form: this.$$form.form as any }) as any;
    // behaviors
    const behaviors = this._prepareBehaviors(options);
    if (behaviors) {
      this._composer = await this.createComposer(behaviors);
    }
  }

  protected __dispose__() {
    this._disposeComposer();
  }

  protected async onOptionsChange(options: IBehaviorOptionsFormField) {
    super.onOptionsChange(options);
    // field
    this._field.api.update({ ...options, form: this.$$form.form as any });
    // behaviors
    const behaviors = this._prepareBehaviors(options);
    if (behaviors) {
      if (!this._composer) {
        this._composer = await this.createComposer(behaviors);
      } else {
        await this._composer.load(behaviors);
      }
    } else {
      this._disposeComposer();
    }
  }

  public get field(): TypeFormField {
    return this._field;
  }

  public get property() {
    return this.$$form.getProperty(this.$options.name);
  }

  public get fieldZodSchema() {
    return this.$$form.getFieldZodSchema(this.$options.name);
  }

  public get formMeta() {
    return this.$$form.formMeta;
  }

  public get formProvider(): IFormProvider {
    return deepExtend({}, this.$$form.formProvider, this.$options.formProvider);
  }

  protected render(props: IBehaviorPropsInputFormField, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    if (!this._composer) return next();
    return this._composer.render(props, next);
  }

  private _disposeComposer() {
    if (this._composer) {
      disposeInstance(this._composer);
      this._composer = undefined;
    }
  }

  private _prepareBehaviors(options: IBehaviorOptionsFormField): IBehaviors | undefined {
    if (options.behaviorModel === false) return undefined;
    if (!options.behaviorModel || options.behaviorModel === true) return this.formProvider.behaviors?.formFieldModel;
    return options.behaviorModel;
  }
}
