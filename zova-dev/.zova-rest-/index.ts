import type { IIconRecord } from 'zova-module-a-icon';
export type { IIconRecord } from 'zova-module-a-icon';
import type { TypePagePathSchema } from 'zova-module-a-router';
export type { IPagePathRecord } from 'zova-module-a-router';
import type { IActionRecord, TypeActionOptions } from 'zova-module-a-action';
export type { IActionRecord } from 'zova-module-a-action';
import type { IVonaComponentRecord, TypeComponentOptions } from 'zova-module-a-bean';
export type { IVonaComponentRecord } from 'zova-module-a-bean';
export type {
  IResourceComponentActionBulkRecord,
  IResourceComponentActionRowRecord,
  IResourceComponentBlockRecord,
  IResourceComponentFormFieldRecord,
  IResourceComponentTableCellRecord,
  ISchemaRenderComponentLayoutOptions,
} from 'zova-module-a-openapi';
export * from '../src/module/demo-student/rest/index.ts';
export * from '../src/suite/a-demo/modules/demo-basic/rest/index.ts';
export * from '../src/suite/a-demo/modules/demo-todo/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-app/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-behavior/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-form/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-icon/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-router/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-table/rest/index.ts';
export * from '../src/suite/a-home/modules/home-base/rest/index.ts';
export * from '../src/suite/a-home/modules/home-icon/rest/index.ts';
export * from '../src/suite/a-home/modules/home-index/rest/index.ts';
export * from '../src/suite/a-home/modules/home-layoutempty/rest/index.ts';
export * from '../src/suite/a-home/modules/home-layouttabs/rest/index.ts';
export * from '../src/suite/a-home/modules/home-login/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-actions/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-actionssync/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-captcha/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-currency/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-date/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-form/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-input/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-page/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-pageentry/rest/index.ts';
export * from '../src/suite/cabloy-basic/modules/basic-table/rest/index.ts';
export * from '../src/suite-vendor/a-cabloy/modules/rest-resource/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-routerstack/rest/index.ts';
export * from '../src/suite-vendor/a-zova/modules/a-routertabs/rest/index.ts';
export function $iconName<K extends keyof IIconRecord>(name: K): any {
  return name;
}
declare module 'zova-module-a-router' {
  export interface IPagePathRecord {
    '/': TypePagePathSchema<undefined, undefined>;
    'presetLogin': TypePagePathSchema<undefined, undefined>;
    'presetErrorExpired': TypePagePathSchema<undefined, undefined>;
    'presetResource': TypePagePathSchema<undefined, undefined>;
  }
}
import 'zova-module-basic-openapi';
export function Action<K extends keyof IActionRecord>(options: TypeActionOptions<K>) {
  if(!options.name) throw new Error('should specify the action name');
  return options.name.replace(':','.action.');
}
export function Component<K extends keyof IVonaComponentRecord>(options: TypeComponentOptions<K>) {
  if (!options.name) throw new Error('should specify the component name');
  return options.name;
}
