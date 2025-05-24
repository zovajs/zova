import type { BeanScopeUtil } from 'zova';
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
import { IBehaviorOptionsForm } from '../bean/behavior.form.jsx';
/** behavior: end */
/** behavior: begin */
import { BehaviorForm } from '../bean/behavior.form.jsx';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.js';
import { BehaviorFormField } from '../bean/behavior.formField.js';

import { IBehaviorOptionsFormFieldModel } from '../bean/behavior.formFieldModel.js';
import { BehaviorFormFieldModel } from '../bean/behavior.formFieldModel.js';
/** controller: end */
/** controller: begin */
import { ControllerForm } from '../component/form/controller.jsx';
/** render: end */
/** render: begin */
import { RenderForm } from '../component/form/render.jsx';
import { ControllerFormField } from '../component/formField/controller.jsx';
import { RenderFormField } from '../component/formField/render.jsx';
import { ZForm } from './component/form.js';
import { ZFormField } from './component/formField.js';
/** render: end */
/** behavior: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

import 'zova';

export * from '../bean/behavior.form.jsx';
export * from '../bean/behavior.formField.js';
declare module 'zova' {

}
declare module 'zova-module-a-form' {

  export interface ControllerForm {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }

  export interface ControllerFormField {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.controller.form': ControllerForm;
    'a-form.controller.formField': ControllerFormField;
  }
}
/** controller: end */

export * from '../bean/behavior.formFieldModel.js';
/** controller: begin */
export * from '../component/form/controller.jsx';
export const components = {
  form: ZForm,
  formField: ZFormField,
};
declare module 'zova' {
  export interface IComponentRecord {
    'a-form:form': ControllerForm;
    'a-form:formField': ControllerFormField;
  }
  export interface IZovaComponentRecord {
    'a-form:form': typeof ZForm;
    'a-form:formField': typeof ZFormField;
  }
}
/** components: end */
/** render: begin */
export * from '../component/form/render.jsx';
export * from '../component/formField/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-a-form' {

  export interface RenderForm {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }

  export interface RenderFormField {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.render.form': RenderForm;
    'a-form.render.formField': RenderFormField;
  }
}
export * from '../component/formField/render.jsx';
/** components: begin */
export * from './component/form.js';
export * from './component/formField.js';
declare module 'zova-module-a-behavior' {

  export interface IBehaviorRecord {
    'a-form:form': IBehaviorOptionsForm;
    'a-form:formField': IBehaviorOptionsFormField;
    'a-form:formFieldModel': IBehaviorOptionsFormFieldModel;
  }

}
declare module 'zova-module-a-form' {

  export interface BehaviorForm {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }

  export interface BehaviorFormField {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }

  export interface BehaviorFormFieldModel {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.behavior.form': BehaviorForm;
    'a-form.behavior.formField': BehaviorFormField;
    'a-form.behavior.formFieldModel': BehaviorFormFieldModel;
  }
}

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-form'?: IBehaviorOptionsForm | '' | boolean;
    'bs-formField'?: IBehaviorOptionsFormField | '' | boolean;
    'bs-formFieldModel'?: IBehaviorOptionsFormFieldModel | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-form'?: IBehaviorOptionsForm | '' | boolean;
      'bs-formField'?: IBehaviorOptionsFormField | '' | boolean;
      'bs-formFieldModel'?: IBehaviorOptionsFormFieldModel | '' | boolean;
    }
  }
}

@Scope()
export class ScopeModuleAForm extends BeanScopeBase {}

export interface ScopeModuleAForm {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-form': ScopeModuleAForm;
  }

}

/** scope: end */
