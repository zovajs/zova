/* eslint-disable */
/** controller: begin */
export * from '../component/form/controller.jsx';
export * from '../component/formField/controller.jsx';
export * from '../component/formSubscribe/controller.jsx';

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

        export interface ControllerFormSubscribe {
          /** @internal */
          get scope(): ScopeModuleAForm;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerForm } from '../component/form/controller.jsx';
import { ControllerFormField } from '../component/formField/controller.jsx';
import { ControllerFormSubscribe } from '../component/formSubscribe/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.controller.form': ControllerForm;
'a-form.controller.formField': ControllerFormField;
'a-form.controller.formSubscribe': ControllerFormSubscribe;
  }
}
/** controller: end */

/** components: begin */
export * from './component/form.js';
import { ZForm } from './component/form.js';
export * from './component/formField.js';
import { ZFormField } from './component/formField.js';
export * from './component/formSubscribe.js';
import { ZFormSubscribe } from './component/formSubscribe.js';
export const components = {
  'form': ZForm,
'formField': ZFormField,
'formSubscribe': ZFormSubscribe,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-form:form': ControllerForm;
'a-form:formField': ControllerFormField;
'a-form:formSubscribe': ControllerFormSubscribe;
}
export interface IZovaComponentRecord {
  'a-form:form': typeof ZForm;
'a-form:formField': typeof ZFormField;
'a-form:formSubscribe': typeof ZFormSubscribe;
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
export * from '../bean/behavior.formField.js';
export * from '../bean/behavior.formFieldModel.js';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.js';
import { IBehaviorOptionsFormFieldModel } from '../bean/behavior.formFieldModel.js';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'a-form:formField': IBehaviorOptionsFormField;
'a-form:formFieldModel': IBehaviorOptionsFormFieldModel;
    }

  
}
declare module 'zova-module-a-form' {
  
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
import { BehaviorFormField } from '../bean/behavior.formField.js';
import { BehaviorFormFieldModel } from '../bean/behavior.formFieldModel.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
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
    'bs-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-formFieldModel'?: IBehaviorOptionsFormFieldModel | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-formFieldModel'?: IBehaviorOptionsFormFieldModel | '' | boolean;
    }
  }
}
/** behaviors: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAForm extends BeanScopeBase {}

export interface ScopeModuleAForm {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-form': ScopeModuleAForm;
  }
  
  export interface IBeanScopeConfig {
    'a-form': ReturnType<typeof config>;
  }

  

  
}
  
/** scope: end */
