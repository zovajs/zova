import { catchError, celEnvBase } from '@cabloy/utils';
import { ZodMetadata } from '@cabloy/zod-openapi';
import { DeepKeys, determineFormLevelErrorSourceAndValue, FormValidationError, getBy, isGlobalFormValidationError, revalidateLogic, useStore, ValidationCause, ValidationError } from '@tanstack/vue-form';
import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { z } from 'zod';
import { $ZodIssue } from 'zod/v4/core';
import { cast, deepEqual, deepExtend, UseScope } from 'zova';
import { isJsxComponent, ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, renderFormFieldTopPropsSystem, schemaToZodSchema, ScopeModuleAOpenapi, TypeFormFieldRenderComponent, TypeFormFieldRenderComponentProvider } from 'zova-module-a-openapi';
import { BeanControllerFormBase } from '../../lib/beanControllerFormBase.js';
import { RevalidateLogicProps, TypeForm, TypeFormOnShowError, TypeFormOnSubmit } from '../../types/form.js';
import { constFieldProps, IFormFieldCelScope, IFormFieldLayoutOptionsBase, IFormFieldRenderContextOptions, TypeFormFieldOnDisplayValueUpdate } from '../../types/formField.js';
import { IFormMeta } from '../../types/formMeta.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormProps<TFormData extends {} = {}, TSubmitMeta = never> {
  formTag?: string;
  inline?: boolean;
  data?: TFormData;
  schema?: SchemaObject;
  zodSchema?: z.ZodObject<any>;
  validateOnDynamic?: boolean;
  validateOnDynamicLogic?: RevalidateLogicProps;
  formMeta?: IFormMeta;
  formProvider?: IFormProvider;
  formFieldLayout?: IFormFieldLayoutOptionsBase;
  onFormSubmit?: (e: SubmitEvent, form: ControllerForm<TFormData, TSubmitMeta>) => any;
  onSubmit?: TypeFormOnSubmit<TFormData, TSubmitMeta>;
  onShowError?: TypeFormOnShowError<TFormData, TSubmitMeta>;
  slotDefault?: (form: ControllerForm<TFormData, TSubmitMeta>) => VNode;
  slotHeader?: (form: ControllerForm<TFormData, TSubmitMeta>) => VNode;
  slotBody?: (children: VNode, form: ControllerForm<TFormData, TSubmitMeta>) => VNode;
  slotFooter?: (form: ControllerForm<TFormData, TSubmitMeta>) => VNode;
}
@Controller()
export class ControllerForm<TFormData extends {} = {}, TSubmitMeta = never> extends BeanControllerFormBase {
  static $propsDefault = { formTag: 'form' };

  form: TypeForm<TFormData, TSubmitMeta>;
  formState: TypeForm<TFormData>['state'];
  formProvider: IFormProvider;
  schema: SchemaObject | undefined;
  zodSchema: z.ZodObject<any> | undefined;
  properties: SchemaObject[] | undefined;
  zovaJsx: ZovaJsx;
  fieldCelEnv: typeof celEnvBase;

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
    this.fieldCelEnv = this._getFieldCelEnv();
    this.zovaJsx = this.app.bean._newBeanSimple(
      ZovaJsx,
      false,
      this.formProvider.components,
      this.fieldCelEnv,
    );
    this.$watch(() => this.$props.data, (newValue, oldValue) => {
      if (deepEqual(newValue, oldValue)) return;
      this.reset(this.$props.data);
    });
  }

  public async submit(submitMeta?: TSubmitMeta) {
    return await this.form.handleSubmit(submitMeta as any);
  }

  public reset(values?: TFormData, opts?: { keepDefaultValues?: boolean }): TFormData {
    this.form.reset(values ?? {} as TFormData, opts);
    return this.form.state.values;
  }

  public get formMeta() {
    return this.$props.formMeta;
  }

  public getFieldValue<K extends DeepKeys<TFormData>>(name: K) {
    return getBy(this.formState.values, name) ?? null;
  }

  public setFieldValue<K extends DeepKeys<TFormData>>(name: K, value: any) {
    this.form.setFieldValue(name, value);
  }

  public getFieldDisplayValue<K extends DeepKeys<TFormData>>(name: K, displayValue?: any) {
    if (displayValue !== undefined) return displayValue;
    return this.getFieldValue(name);
  }

  public onDisplayValueUpdate(value: any, onDisplayValueUpdate?: TypeFormFieldOnDisplayValueUpdate) {
    if (onDisplayValueUpdate) return onDisplayValueUpdate(value);
    return value;
  }

  public handleFieldDisplayValueUpdate<K extends DeepKeys<TFormData>>(name: K, value: any, onDisplayValueUpdate?: TypeFormFieldOnDisplayValueUpdate) {
    return this.setFieldValue(name, this.onDisplayValueUpdate(value, onDisplayValueUpdate));
  }

  public getFieldProperty<K extends DeepKeys<TFormData>>(name: K): SchemaObject | undefined {
    if (!this.properties) return;
    return this.properties.find(item => item.key === name);
  }

  public getFieldZodSchema<K extends DeepKeys<TFormData>>(name: K) {
    return ZodMetadata.getFieldSchema(this.zodSchema, name as string);
  }

  private _getFieldCelEnv(): typeof celEnvBase {
    const celEnv = celEnvBase.clone();
    celEnv.registerFunction('getValue(string):dyn', name => {
      return this.form.getFieldValue(name);
    });
    celEnv.registerFunction('getProperty(string):dyn', name => {
      return this.getFieldProperty(name);
    });
    return celEnv;
  }

  public getFieldCelScope<K extends DeepKeys<TFormData>>(name: K, scopeExtra?: {}): IFormFieldCelScope {
    return {
      name,
      value: this.getFieldValue(name),
      property: this.getFieldProperty(name),
      ...scopeExtra,
    };
  }

  public getFieldComponentPropsTop<K extends DeepKeys<TFormData>>(name: K, celScope: {}): IFormFieldRenderContextOptions {
    const props: any = { [constFieldProps]: true, key: name, name };
    const property = this.getFieldProperty(name);
    if (!property) return props;
    const rest = property.rest;
    if (!rest) return props;
    const keys = Object.keys(rest).filter(item => !renderFormFieldTopPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      const value = rest[key];
      let keyValue;
      if (key === 'render') {
        if (typeof value === 'string') {
          keyValue = this.zovaJsx.evaluateExpression(value, celScope);
        } else {
          keyValue = value;
        }
      } else {
        keyValue = this.zovaJsx.renderJsxOrCel(value, undefined, celScope);
      }
      props[key] = keyValue;
    }
    return props;
  }

  public getRenderFlattern(render: TypeFormFieldRenderComponent): TypeFormFieldRenderComponent {
    return isJsxComponent(render) ? cast(render).type : render;
  }

  public getRenderProvider(render: TypeFormFieldRenderComponent): TypeFormFieldRenderComponentProvider {
    let renderProvider = this.getRenderFlattern(render);
    if (typeof renderProvider === 'string') {
      renderProvider = this.formProvider.components?.[renderProvider] ?? renderProvider;
    }
    return renderProvider as TypeFormFieldRenderComponentProvider;
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
          return this.$props.onSubmit?.(data, this);
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
              this.$props.onShowError?.({ data, error }, this);
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
