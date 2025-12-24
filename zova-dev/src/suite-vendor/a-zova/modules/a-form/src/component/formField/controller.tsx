import type { ControllerForm } from '../form/controller.jsx';
import { useField } from '@tanstack/vue-form';
import { createVNode } from 'vue';
import z from 'zod';
import { BeanControllerBase, deepExtend, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { $UseBehaviorTag, BeanBehaviorsHolder, IBehaviorItem } from 'zova-module-a-behavior';
import { TypeFormField } from '../../types/form.js';
import { IFormFieldOptions, IFormFieldRenderContext } from '../../types/formField.js';

export interface ControllerFormFieldProps<TParentData extends {} = {}> extends IFormFieldOptions<TParentData> {}

@Controller()
export class ControllerFormField<TParentData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  private _formField: TypeFormField;

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  @Use()
  $$beanBehaviorsHolder: BeanBehaviorsHolder;

  protected async __init__() {
    // provide
    this.bean._setBean('$$formField', this);
    // field
    const options = this._getFormFieldOptions();
    this._formField = useField(options as any) as any;
    // behaviors
    await this.$$beanBehaviorsHolder.initialize({
      behaviorTag: $UseBehaviorTag(this._getFieldComponent()),
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

  protected render() {
    const property = this.property;
    const name = this.name;
    const renderContext: IFormFieldRenderContext<TParentData> = {
      options: Object.assign(
        {
          bordered: this.scope.config.formFieldLayout.bordered,
          label: property?.title ?? name,
        },
        this.$$form.$props.formFieldLayout,
        this.$props as IFormFieldOptions<TParentData>,
      ),
      props: {
        name,
      },
    };
    return this.$$beanBehaviorsHolder.render((renderProps: IFormFieldRenderContext<TParentData>) => {
      return this._renderSlotDefault(renderProps);
    }, renderContext);
  }

  private _renderSlotDefault(renderContext: IFormFieldRenderContext<TParentData>) {
    if (this.$slotDefault) {
      return this.$slotDefault!(renderContext, this.field);
    }
    const restRender = this.property?.rest?.render;
    if (restRender && typeof restRender === 'object') {
      const celContext = {
        ...this.$$form.getFieldExpressionContext(this.name),
        renderContext,
      };
      return this.$$form.renderJsx(restRender, renderContext.props, celContext);
    }
    return createVNode(this.$$beanBehaviorsHolder.options.behaviorTag.component, renderContext.props as any);
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

  private _getFieldComponent() {
    const property = this.property;
    const restRender = property?.rest?.render;
    const restRenderType = restRender && typeof restRender === 'object' ? restRender.type : restRender;
    let render = this.$props.render ?? restRenderType ?? 'text';
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
    behaviors[behaviorFormField] = {};
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem) {
    const behaviorFormFieldLayout = this.formProvider.behaviors?.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = {};
  }

  private _getFormFieldOptions() {
    const zodSchemaField = this.fieldZodSchema;
    const validateOnDynamicDefault =
      this.$props.validateOnDynamic === undefined && this.$props.validateOnBlur === undefined && this.$props.validateOnChange === undefined;
    const validateOnDynamic = this.$props.validateOnDynamic ?? validateOnDynamicDefault;
    const validateOnBlur = this.$props.validateOnBlur;
    const validateOnChange = this.$props.validateOnChange;
    return {
      name: this.name,
      form: this.$$form.form,
      validators: {
        onDynamic: _normalizeValidateSchema(validateOnDynamic, zodSchemaField),
        onBlur: _normalizeValidateSchema(validateOnBlur, zodSchemaField),
        onChange: _normalizeValidateSchema(validateOnChange, zodSchemaField),
      },
    };
  }
}

function _normalizeValidateSchema(validateSchema?: boolean | z.ZodType, zodSchemaField?: z.ZodType) {
  if (!validateSchema) return undefined;
  if (validateSchema === true) return zodSchemaField;
  return validateSchema;
}
