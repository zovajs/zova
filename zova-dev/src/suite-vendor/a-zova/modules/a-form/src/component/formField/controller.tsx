import { isNil } from '@cabloy/utils';
import { useField } from '@tanstack/vue-form';
import z from 'zod';
import { BeanControllerBase, deepEqual, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanBehaviorsHolder, IBehaviorItem } from 'zova-module-a-behavior';

import type { ControllerForm } from '../form/controller.jsx';

import { TypeFormField } from '../../types/form.js';
import {
  constFieldProps,
  IFormFieldOptions,
  IFormFieldPresetOptions,
  IFormFieldRenderContext,
  IFormFieldRenderContextProps,
  IFormFieldRenderContextPropsBucket,
  inputTypePresets,
} from '../../types/formField.js';

export interface ControllerFormFieldProps<
  TParentData extends {} = {},
> extends IFormFieldPresetOptions<TParentData> {}

@Controller()
export class ControllerFormField<TParentData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  private _formField: TypeFormField;
  public propsBucket: IFormFieldRenderContextPropsBucket<TParentData>;

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
    this.propsBucket = this.$useComputed(() => {
      return this._getPropsBucket();
    });
    // defaultValue
    // this._handleDefaultValue();
    // watch
    this.$watch(
      () => this.property,
      (newValue, oldValue) => {
        if (deepEqual(newValue, oldValue)) return;
        // defaultValue
        // this._handleDefaultValue();
        const options = this._getFormFieldOptions();
        this._formField.api.update(options as any);
        this.form.resetField(this.name);
      },
    );
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

  public setDisplayValue(value: any, disableNotifyChanged?: boolean) {
    if (disableNotifyChanged === undefined) {
      disableNotifyChanged = this.propsBucket.disableNotifyChanged;
    }
    return this.$$form.setFieldDisplayValue(
      this.name,
      value,
      this.propsBucket.onSetDisplayValue,
      disableNotifyChanged,
    );
  }

  public setValue(value: any, disableNotifyChanged?: boolean) {
    if (disableNotifyChanged === undefined) {
      disableNotifyChanged = this.propsBucket.disableNotifyChanged;
    }
    return this.$$form.setFieldValue(this.name, value, disableNotifyChanged);
  }

  public getRenderContext(): IFormFieldRenderContext<TParentData> {
    const name = this.name;
    // propsBucket
    const propsBucket = this.propsBucket;
    // props
    const props: IFormFieldRenderContextProps = { name };
    if (propsBucket.class) {
      props.class = propsBucket.class;
    }
    // celScope
    const celScope = this.$$form.getFieldScope(this.name, {
      displayValue: propsBucket.displayValue,
    });
    const jsxRenderContext = this.$$form.getFieldJsxRenderContext(this, celScope);
    return { propsBucket, props, celScope, jsxRenderContext };
  }

  private _getPropsBucket() {
    const property = this.property;
    const name = this.name;
    // options
    const propsTop = this._getFieldComponentPropsTop();
    const propsBucket = Object.assign(
      {
        bordered: this.scope.config.formFieldLayout.bordered,
        label: property?.title ?? name,
        render: 'text', // default
      },
      this.$$form.$props.formFieldLayout,
      propsTop,
      this.$props as IFormFieldOptions<TParentData>,
    );
    // render
    propsBucket.renderFlattern = this.$$form.getRenderFlattern(propsBucket.render);
    propsBucket.renderProvider = this.$$form.getRenderProvider(propsBucket.render);
    return propsBucket;
  }

  private _getFieldComponentPropsTop() {
    if (this.$props[constFieldProps] === true) return;
    const celScope = this.$$form.getFieldScope(this.name);
    const jsxRenderContext = this.$$form.getFieldJsxRenderContext(this, celScope);
    return this.$$form.getFieldComponentPropsTop(this.name, celScope, jsxRenderContext);
  }

  private _getFieldBehaviors() {
    const behaviors: IBehaviorItem = {};
    // custom
    if (this.$props.behaviors) {
      Object.assign(behaviors, this.$props.behaviors);
    }
    // formField
    this._prepareBehaviorFormField(behaviors);
    // formFieldLayout
    this._prepareBehaviorFormFieldLayout(behaviors);
    return behaviors;
  }

  private _prepareBehaviorFormField(behaviors: IBehaviorItem) {
    const behaviorFormField = this.formProvider.behaviors?.formField;
    if (!behaviorFormField) return;
    behaviors[behaviorFormField] = {} as never;
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem) {
    const behaviorFormFieldLayout = this.formProvider.behaviors?.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = {} as never;
  }

  // private _handleDefaultValue() {
  //   const defaultValue = this.$props.defaultValue ?? this.property?.default;
  //   if (isNil(defaultValue)) return;
  //   const value = this.$$form.getFieldValue(this.name);
  //   if (isNil(value)) {
  //     this.$$form.setFieldValue(this.name, defaultValue, true);
  //   }
  // }

  private _getFormFieldOptions() {
    // defaultValue
    const value = this.$$form.getFieldValue(this.name);
    const defaultValue = isNil(value)
      ? (this.$props.defaultValue ?? this.property?.default)
      : undefined;
    // validators
    const validators = this._getFormFieldOptionsValidators();
    return Object.assign(
      {
        defaultValue,
      },
      this.$props,
      {
        form: this.$$form.form,
        validators,
      },
    );
  }

  private _getFormFieldOptionsValidators() {
    const zodSchemaField = this.fieldZodSchema;
    const validateOnDynamicDefault =
      this.$props.validateOnDynamic === undefined &&
      this.$props.validateOnBlur === undefined &&
      this.$props.validateOnChange === undefined;
    const validateOnDynamic = this.$props.validateOnDynamic ?? validateOnDynamicDefault;
    const validateOnBlur = this.$props.validateOnBlur;
    const validateOnChange = this.$props.validateOnChange;
    return Object.assign(
      {},
      {
        onDynamic: _normalizeValidateSchema(validateOnDynamic, zodSchemaField),
        onBlur: _normalizeValidateSchema(validateOnBlur, zodSchemaField),
        onChange: _normalizeValidateSchema(validateOnChange, zodSchemaField),
      },
      this.$props.validators,
    );
  }
}

function _normalizeValidateSchema(
  validateSchema?: boolean | z.ZodType,
  zodSchemaField?: z.ZodType,
) {
  if (!validateSchema) return undefined;
  if (validateSchema === true) return zodSchemaField;
  return validateSchema;
}
