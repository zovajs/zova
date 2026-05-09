import type { IActionRecord, TypeActionOptions } from 'zova-module-a-action';
import type { IVonaComponentRecord, TypeComponentOptions } from 'zova-module-a-bean';
import type { IIconRecord } from 'zova-module-a-icon';
import type { TypePagePathSchema } from 'zova-module-a-router';

declare module 'zova-module-a-router' {
  export interface IPagePathRecord {
    '/': TypePagePathSchema<undefined, undefined>;
    'presetLogin': TypePagePathSchema<undefined, undefined>;
    'presetErrorExpired': TypePagePathSchema<undefined, undefined>;
    'presetResource': TypePagePathSchema<undefined, undefined>;
  }
}

export function $iconName<K extends keyof IIconRecord>(name: K): any {
  return name;
}

export function Action<K extends keyof IActionRecord>(options: TypeActionOptions<K>) {
  if (!options.name) throw new Error('should specify the action name');
  return options.name.replace(':', '.action.');
}

export function Component<K extends keyof IVonaComponentRecord>(options: TypeComponentOptions<K>) {
  if (!options.name) throw new Error('should specify the component name');
  return options.name;
}
