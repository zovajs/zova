import { catchError, celEnvBase, evaluateExpressions } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { DeepKeys, determineFormLevelErrorSourceAndValue, FormValidationError, isGlobalFormValidationError, revalidateLogic, useStore, ValidationCause, ValidationError } from '@tanstack/vue-form';
import { SchemaObject } from 'openapi3-ts/oas31';
import { h, VNode } from 'vue';
import { z } from 'zod';
import { $ZodIssue } from 'zod/v4/core';
import { deepEqual, deepExtend, UseScope } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, renderJsxPropsSystem, schemaToZodSchema, ScopeModuleAOpenapi, TypeRenderComponent, TypeRenderComponentJsx, TypeRenderComponentJsxProps } from 'zova-module-a-openapi';
import { BeanControllerFormBase } from '../../lib/beanControllerFormBase.js';
import { RevalidateLogicProps, TypeForm, TypeFormOnShowError, TypeFormOnSubmit } from '../../types/form.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptionsBase } from '../../types/formField.js';
import { IFormMeta } from '../../types/formMeta.js';
import { IFormProvider, IFormProviderComponents } from '../../types/provider.js';

export interface ControllerFormProps<TFormData extends {} = {}, TSubmitMeta = never> {
  inline?: boolean;
  data?: TFormData;
  schema?: SchemaObject;
  zodSchema?: z.ZodObject<any>;
  validateOnDynamic?: boolean;
  validateOnDynamicLogic?: RevalidateLogicProps;
  formMeta?: IFormMeta;
  formProvider?: IFormProvider;
  formField?: IFormFieldOptionsBase;
  formFieldLayout?: IFormFieldLayoutOptionsBase;
  onSubmit?: TypeFormOnSubmit<TFormData, TSubmitMeta>;
  onShowError?: TypeFormOnShowError<TFormData, TSubmitMeta>;
}
@Controller()
export class ControllerForm<TFormData extends {} = {}, TSubmitMeta = never> extends BeanControllerFormBase {
  static $propsDefault = {};

  form: TypeForm<TFormData, TSubmitMeta>;
  formState: TypeForm<TFormData>['state'];
  formProvider: IFormProvider;
  schema: SchemaObject | undefined;
  zodSchema: z.ZodObject<any> | undefined;
  properties: SchemaObject[] | undefined;

  private _fieldExpressionEnv: typeof celEnvBase;

  @UseScope()
  $$scopeModuleAOpenapi: ScopeModuleAOpenapi;

  protected async __init__() {
    this.bean._setBean('$$form', this);
    this.form = this._createForm();
    this.formState = useStore(this.form.store, state => state) as any;
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.restResource.form?.provider, this.$props.formProvider);
    });
    this.schema = this.$useComputed(() => {
      return this.$props.schema;
    });
    this.zodSchema = this.$useComputed(() => {
      return this._getZodSchema();
    });
    this.properties = this.$useComputed(() => {
      return loadSchemaProperties(this.schema, 'form');
    });
    this.$watch(() => this.$props.data, (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      this.reset(this.$props.data);
    });
  }

  public submit(submitMeta?: TSubmitMeta) {
    return this.form.handleSubmit(submitMeta as any);
  }

  public reset(values?: TFormData, opts?: { keepDefaultValues?: boolean }): TFormData {
    this.form.reset(values ?? {} as TFormData, opts);
    return this.form.state.values;
  }

  public get formMeta() {
    return this.$props.formMeta;
  }

  public get formField() {
    return this.$props.formField;
  }

  public get formFieldLayout() {
    return this.$props.formFieldLayout;
  }

  public getFieldProperty<K extends DeepKeys<TFormData>>(name: K): SchemaObject | undefined {
    if (!this.properties) return;
    return this.properties.find(item => item.key === name);
  }

  public getFieldZodSchema<K extends DeepKeys<TFormData>>(name: K) {
    return ZodMetadata.getFieldSchema(this.zodSchema, name as string);
  }

  public get fieldExpressionEnv(): typeof celEnvBase {
    if (!this._fieldExpressionEnv) {
      const celEnv = celEnvBase.clone();
      celEnv.registerFunction('getValue(string):dyn', name => {
        return this.form.getFieldValue(name);
      });
      celEnv.registerFunction('getProperty(string):dyn', name => {
        return this.getFieldProperty(name);
      });
      this._fieldExpressionEnv = celEnv;
    }
    return this._fieldExpressionEnv;
  }

  public getFieldExpressionContext<K extends DeepKeys<TFormData>>(name: K) {
    return {
      name,
      value: this.form.getFieldValue(name),
      property: this.getFieldProperty(name),
    };
  }

  public fieldEvaluateExpressions(expression: any, celContext?: {}) {
    return evaluateExpressions(
      expression,
      celContext,
      this.fieldExpressionEnv,
    );
  }

  public renderJsx(componentOptions: TypeRenderComponentJsx, propsInit: {}, celContext: {}) {
    // component
    const Component = this.normalizeComponent(componentOptions.type as TypeRenderComponent);
    // props
    const props = this._renderJsxProps(componentOptions.props, propsInit, celContext);
    // children
    const children = this._renderJsxChildren(componentOptions.props?.children, celContext);
    // h
    return h(Component, props, children);
  }

  public normalizeComponent(type: TypeRenderComponent, components?: IFormProviderComponents) {
    if (typeof type === 'object') type = (type as TypeRenderComponentJsx).type as any;
    if (typeof type === 'string') {
      type = components?.[type] ?? type;
    }
    if (typeof type === 'function') return type;
    if (typeof type === 'string' && type.includes(':')) return this.$zovaComponent(type as any);
    // div/QInput
    return type;
  }

  private _renderJsxProps(jsxProps: TypeRenderComponentJsxProps | undefined, propsInit: {}, celContext: {}) {
    if (!jsxProps) return propsInit;
    const keys = Object.keys(jsxProps).filter(item => !renderJsxPropsSystem.includes(item));
    if (keys.length === 0) return propsInit;
    const props = { ...propsInit };
    for (const key of keys) {
      const keyValue = this.fieldEvaluateExpressions(jsxProps[key], celContext);
      props[key] = keyValue;
    }
    return props;
  }

  private _renderJsxChildren(jsxChildren: TypeRenderComponentJsx | TypeRenderComponentJsx[] | undefined, celContext: {}) {
    if (!jsxChildren) return undefined;
    if (!Array.isArray(jsxChildren)) jsxChildren = [jsxChildren];
    const children: VNode[] = [];
    for (const jsxChild of jsxChildren) {
      const propsInit = { key: jsxChild.key }; // key will be not a celjs
      const child = this.renderJsx(jsxChild, propsInit, celContext);
      children.push(child);
    }
    return children;
  }

  private _getZodSchema() {
    if (this.$props.zodSchema) return this._patchZodSchema(this.$props.zodSchema);
    if (!this.schema) return;
    return this._patchZodSchema(schemaToZodSchema<z.ZodObject<any>>(this.schema));
  }

  private _patchZodSchema(schema: z.ZodObject<any> | z.ZodUnion<any>) {
    if (schema.def.type === 'object') return schema;
    if (schema.def.type === 'union') {
      return schema.def.options.find(item => item.def.type === 'object');
    }
    throw new Error('invalid zod schema');
  }

  private _createForm() {
    // not use $useComputed
    return this.$useForm<TFormData, TSubmitMeta>({
      defaultValues: this.$props.data,
      validationLogic: this.$props.validateOnDynamic !== false ? revalidateLogic(this.$props.validateOnDynamicLogic) : undefined,
      onSubmit: async data => {
        const [_, error] = await catchError(() => {
          return this.$props.onSubmit?.(data);
        });
          // emit event
        const resHandled = await this.app.meta.event.emit('a-form:formSubmission', {
          form: this.form as any,
          data,
          error,
        });
        if (error) {
          if (error.code === 422) {
            this._handleError422(error);
          } else {
            if (!resHandled) {
              this.$props.onShowError?.({ data, error });
            }
          }
          throw error;
        }
      },
    });
  }

  private _handleError422(error: Error, cause: ValidationCause = 'submit') {
    const formApi = this.form;

    let hasErrored = false as boolean;

    // This map will only include fields that have errors in the current validation cycle
    const currentValidationErrorMap: any = {};

    const rawError = parseIssues(error);
    const { formError, fieldErrors } = normalizeError<TFormData>(rawError);

    const errorMapKey = getErrorMapKey(cause);

    for (const field of Object.keys(formApi.state.fieldMeta) as DeepKeys<TFormData>[]) {
      if (formApi.baseStore.state.fieldMetaBase[field] === undefined) {
        continue;
      }

      const fieldMeta = formApi.getFieldMeta(field);
      if (!fieldMeta) continue;

      const {
        errorMap: currentErrorMap,
        errorSourceMap: currentErrorMapSource,
      } = fieldMeta;

      const newFormValidatorError = fieldErrors?.[field];

      const { newErrorValue, newSource } =
            determineFormLevelErrorSourceAndValue({
              newFormValidatorError,
              isPreviousErrorFromFormValidator:
                currentErrorMapSource?.[errorMapKey] === 'form',
              previousErrorValue: currentErrorMap?.[errorMapKey],
            });

      if (newSource === 'form') {
        currentValidationErrorMap[field] = {
          ...currentValidationErrorMap[field],
          [errorMapKey]: newFormValidatorError,
        };
      }

      if (
        currentErrorMap?.[errorMapKey] !== newErrorValue
      ) {
        formApi.setFieldMeta(field, prev => ({
          ...prev,
          errorMap: {
            ...prev.errorMap,
            [errorMapKey]: newErrorValue,
          },
          errorSourceMap: {
            ...prev.errorSourceMap,
            [errorMapKey]: newSource,
          },
        }));
      }
    }

    if (formApi.state.errorMap?.[errorMapKey] !== formError) {
      formApi.baseStore.setState(prev => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          [errorMapKey]: formError,
        },
      }));
    }

    if (formError || fieldErrors) {
      hasErrored = true;
    }

    /**
       *  when we have an error for onSubmit in the state, we want
       *  to clear the error as soon as the user enters a valid value in the field
       */
    const submitErrKey = getErrorMapKey('submit');
    if (
      formApi.state.errorMap?.[submitErrKey] &&
      cause !== 'submit' &&
      !hasErrored
    ) {
      formApi.baseStore.setState(prev => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          [submitErrKey]: undefined,
        },
      }));
    }

    /**
       *  when we have an error for onServer in the state, we want
       *  to clear the error as soon as the user enters a valid value in the field
       */
    const serverErrKey = getErrorMapKey('server');
    if (
      formApi.state.errorMap?.[serverErrKey] &&
      cause !== 'server' &&
      !hasErrored
    ) {
      formApi.baseStore.setState(prev => ({
        ...prev,
        errorMap: {
          ...prev.errorMap,
          [serverErrKey]: undefined,
        },
      }));
    }
  }
}

function parseIssues(error: Error) {
  const issues: $ZodIssue[] = typeof error.message === 'string' ? JSON.parse(error.message) : error.message;
  const fields = {};
  for (const issue of issues) {
    const key = issue.path.join('.');
    fields[key] = issue;
  }
  return { fields };
}

function normalizeError<TFormData>(rawError?: FormValidationError<unknown>): {
  formError: ValidationError;
  fieldErrors?: Partial<Record<DeepKeys<TFormData>, ValidationError>>;
} {
  if (rawError) {
    if (isGlobalFormValidationError(rawError)) {
      const formError = normalizeError(rawError.form).formError;
      const fieldErrors = rawError.fields;
      return { formError, fieldErrors } as never;
    }

    return { formError: rawError };
  }

  return { formError: undefined };
}

function getErrorMapKey(cause: ValidationCause) {
  switch (cause) {
    case 'submit':
      return 'onSubmit';
    case 'blur':
      return 'onBlur';
    case 'mount':
      return 'onMount';
    case 'server':
      return 'onServer';
    case 'dynamic':
      return 'onDynamic';
    case 'change':
    default:
      return 'onChange';
  }
}
