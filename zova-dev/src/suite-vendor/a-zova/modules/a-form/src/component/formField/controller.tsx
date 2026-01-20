import type { ControllerForm } from '../form/controller.jsx';
import { useField } from '@tanstack/vue-form';
import z from 'zod';
import { BeanControllerBase, deepEqual, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BeanBehaviorsHolder, IBehaviorItem } from 'zova-module-a-behavior';
import { TypeFormField } from '../../types/form.js';
import { constFieldProps, IFormFieldOptions, IFormFieldRenderContext, IFormFieldRenderContextProps, IFormFieldRenderContextPropsBucket, inputTypePresets } from '../../types/formField.js';

export interface ControllerFormFieldProps<TParentData extends {} = {}> extends IFormFieldOptions<TParentData> {}

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
    // watch
    this.$watch(() => this.property, (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      const options = this._getFormFieldOptions();
      this._formField.api.update(options as any);
      this.form.resetField(this.name);
    });
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

  public setDisplayValue(value: any) {
    return this.$$form.setFieldDisplayValue(this.name, value, this.propsBucket.onSetDisplayValue);
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
    const celScope = this.$$form.getFieldCelScope(this.name, {
      displayValue: propsBucket.displayValue,
    });
    const hostProviders = this.$$form.getFieldHostProviders(this, celScope);
    return { propsBucket, props, celScope, hostProviders };
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
    const celScope = this.$$form.getFieldCelScope(this.name);
    const hostProviders = this.$$form.getFieldHostProviders(this, celScope);
    return this.$$form.getFieldComponentPropsTop(this.name, celScope, hostProviders);
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
