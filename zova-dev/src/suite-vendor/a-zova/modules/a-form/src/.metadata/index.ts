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
import { ZForm } from './component/form.js';
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
declare module 'zova' {

}
declare module 'zova-module-a-form' {

  export interface ControllerForm {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.controller.form': ControllerForm;
  }
}
/** controller: end */

export * from '../bean/behavior.formField.js';
export const components = {
  form: ZForm,
};
declare module 'zova' {
  export interface IComponentRecord {
    'a-form:form': ControllerForm;
  }
  export interface IZovaComponentRecord {
    'a-form:form': typeof ZForm;
  }
}
export * from '../bean/behavior.formFieldModel.js';
declare module 'zova' {

}
declare module 'zova-module-a-form' {

  export interface RenderForm {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.render.form': RenderForm;
  }
}
/** controller: begin */
export * from '../component/form/controller.jsx';
/** components: end */
/** render: begin */
export * from '../component/form/render.jsx';
/** components: begin */
export * from './component/form.js';
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
