import type { ControllerForm } from '../form/controller.jsx';
import { useField } from '@tanstack/vue-form';
import z from 'zod';
import { BeanControllerBase, deepExtend, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanBehaviorsHolder, IBehaviorItem } from 'zova-module-a-behavior';
import { TypeFormField } from '../../types/form.js';
import { IFormFieldOptions, inputTypePresets } from '../../types/formField.js';

export interface ControllerFormFieldProps<TParentData extends {} = {}> extends IFormFieldOptions<TParentData> {}

@Controller()
export class ControllerFormField<TParentData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  private _formField: TypeFormField;

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm<TParentData>;

  @Use()
  $$beanBehaviorsHolder: BeanBehaviorsHolder;

  protected async __init__() {
    if (!this.$$form) {
      throw new Error(`FormField component should be used in Form component: ${this.name}`);
    }
    // provide
    this.bean._setBean('$$formField', this);
    // field
    const options = this._getFormFieldOptions();
    this._formField = useField(options as any) as any;
    // behaviors
    await this.$$beanBehaviorsHolder.initialize({
      behaviorTag: undefined as any,
      behaviors: () => {
        return this._getFieldBehaviors();
      },
    });
  }

  public get form() {
    return this.$$form.form;
  }

  public get field(): TypeFormField {
    return this._formField;
  }

  public get name() {
    return this.$props.name;
  }

  public get property() {
    return this.$$form.getFieldProperty(this.name);
  }

  public get fieldZodSchema() {
    return this.$$form.getFieldZodSchema(this.name);
  }

  public get formMeta() {
    return this.$$form.formMeta;
  }

  public get formProvider() {
    return this.$$form.formProvider;
  }

  public normalizeInputType(renderFlattern: any, inputType?: string) {
    if (inputType) return inputType;
    if (typeof renderFlattern === 'string' && inputTypePresets.includes(renderFlattern)) {
      return renderFlattern;
    }
    return 'text';
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
    behaviors[behaviorFormField] = {};
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem) {
    const behaviorFormFieldLayout = this.formProvider.behaviors?.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = {};
  }

  private _getFormFieldOptions() {
    const validators = this._getFormFieldOptionsValidators();
    return Object.assign({}, this.$props, {
      form: this.$$form.form,
      validators,
    });
  }

  private _getFormFieldOptionsValidators() {
    const zodSchemaField = this.fieldZodSchema;
    const validateOnDynamicDefault =
      this.$props.validateOnDynamic === undefined && this.$props.validateOnBlur === undefined && this.$props.validateOnChange === undefined;
    const validateOnDynamic = this.$props.validateOnDynamic ?? validateOnDynamicDefault;
    const validateOnBlur = this.$props.validateOnBlur;
    const validateOnChange = this.$props.validateOnChange;
    return Object.assign({}, {
      onDynamic: _normalizeValidateSchema(validateOnDynamic, zodSchemaField),
      onBlur: _normalizeValidateSchema(validateOnBlur, zodSchemaField),
      onChange: _normalizeValidateSchema(validateOnChange, zodSchemaField),
    }, this.$props.validators);
  }
}

function _normalizeValidateSchema(validateSchema?: boolean | z.ZodType, zodSchemaField?: z.ZodType) {
  if (!validateSchema) return undefined;
  if (validateSchema === true) return zodSchemaField;
  return validateSchema;
}
