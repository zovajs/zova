import type { IBehaviors } from 'zova-module-a-behavior';
import type { TypeBehaviorFormFieldOptions } from './form.js';

export interface IFormFieldLayoutOptionsBase {
  label?: string | false;
  bordered?: boolean;
}

export interface IFormFieldOptionsBase {
  behaviorModel?: IBehaviors | boolean;
}

export interface IFormFieldOptions<TParentData>
  extends TypeBehaviorFormFieldOptions<TParentData>, IFormFieldOptionsBase {}
