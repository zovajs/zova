/* eslint-disable */
/** controller: begin */
export * from '../component/form/controller.jsx';
export * from '../component/formField/controller.jsx';

import 'zova';
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
/** controller: end */
/** controller: begin */
import { ControllerForm } from '../component/form/controller.jsx';
import { ControllerFormField } from '../component/formField/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.controller.form': ControllerForm;
'a-form.controller.formField': ControllerFormField;
  }
}
/** controller: end */

/** components: begin */
export * from './component/form.js';
import { ZForm } from './component/form.js';
export * from './component/formField.js';
import { ZFormField } from './component/formField.js';
export const components = {
  'form': ZForm,
'formField': ZFormField,
};
import 'zova';
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
export * from '../component/formField/render.jsx';

import 'zova';
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
/** render: end */
/** render: begin */
import { RenderForm } from '../component/form/render.jsx';
import { RenderFormField } from '../component/formField/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.render.form': RenderForm;
'a-form.render.formField': RenderFormField;
  }
}
/** render: end */
/** behavior: begin */
export * from '../bean/behavior.form.jsx';
export * from '../bean/behavior.formField.js';
export * from '../bean/behavior.formFieldModel.js';
import { IBehaviorOptionsForm } from '../bean/behavior.form.jsx';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.js';
import { IBehaviorOptionsFormFieldModel } from '../bean/behavior.formFieldModel.js';
import 'zova-module-a-behavior';
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

        export interface BehaviorForm {
          get $beanFullName(): 'a-form.behavior.form';
          get $onionName(): 'a-form:form';
          get $onionOptions(): IBehaviorOptionsForm;
        }

        export interface BehaviorFormField {
          /** @internal */
          get scope(): ScopeModuleAForm;
        }

        export interface BehaviorFormField {
          get $beanFullName(): 'a-form.behavior.formField';
          get $onionName(): 'a-form:formField';
          get $onionOptions(): IBehaviorOptionsFormField;
        }

        export interface BehaviorFormFieldModel {
          /** @internal */
          get scope(): ScopeModuleAForm;
        }

        export interface BehaviorFormFieldModel {
          get $beanFullName(): 'a-form.behavior.formFieldModel';
          get $onionName(): 'a-form:formFieldModel';
          get $onionOptions(): IBehaviorOptionsFormFieldModel;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorForm } from '../bean/behavior.form.jsx';
import { BehaviorFormField } from '../bean/behavior.formField.js';
import { BehaviorFormFieldModel } from '../bean/behavior.formFieldModel.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.behavior.form': BehaviorForm;
'a-form.behavior.formField': BehaviorFormField;
'a-form.behavior.formFieldModel': BehaviorFormFieldModel;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

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
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAForm extends BeanScopeBase {}

export interface ScopeModuleAForm {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-form': ScopeModuleAForm;
  }
  
  

  

  
}
  
/** scope: end */
