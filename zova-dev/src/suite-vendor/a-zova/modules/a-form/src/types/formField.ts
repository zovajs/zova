import type { IBehaviors } from 'zova-module-a-behavior';

export interface IFormFieldLayoutOptions {
  label: string;
  bordered?: boolean;
}

export interface IFormFieldOptions {
  behaviorModel?: IBehaviors | boolean;
}
