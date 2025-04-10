import type { IModule } from '@cabloy/module-info';
import type { BeanBase } from '../../bean/beanBase.js';
import type { BeanContainer } from '../../bean/beanContainer.js';
import type { IControllerData } from '../../bean/type.js';

export type TypeMonkeyName = keyof IMonkeyModule | keyof IMonkeyApp | keyof IMonkeyController;

export interface IModuleMain {
  moduleLoading(): Promise<void>;
  moduleLoaded(): Promise<void>;
  configLoaded(config: any): Promise<void>;
}

export interface IMonkeyModule {
  moduleLoading(module: IModule): Promise<void>;
  moduleLoaded(module: IModule): Promise<void>;
  configLoaded(module: IModule, config: any): Promise<void>;
}

export interface IMonkeyApp
  extends IMonkeyAppInitialize,
  IMonkeyAppInitialized,
  IMonkeyAppReady,
  IMonkeyBeanInit,
  IMonkeyBeanInited,
  IMonkeyBeanDispose,
  IMonkeyBeanDisposed {}

export interface IMonkeyController {
  controllerDataPrepare(controllerData: IControllerData);
  controllerDataInit(controllerData: IControllerData, controller: BeanBase);
}

export interface IMonkeyAppInitialize {
  appInitialize(): Promise<void>;
}

export interface IMonkeyAppInitialized {
  appInitialized(): Promise<void>;
}

export interface IMonkeyAppReady {
  appReady(): Promise<void>;
}

export interface IMonkeyBeanInit {
  beanInit(bean: BeanContainer, beanInstance: BeanBase): Promise<void>;
}

export interface IMonkeyBeanInited {
  beanInited(bean: BeanContainer, beanInstance: BeanBase): Promise<void>;
}

export interface IMonkeyBeanDispose {
  beanDispose(bean: BeanContainer, beanInstance: BeanBase): void;
}

export interface IMonkeyBeanDisposed {
  beanDisposed(bean: BeanContainer, beanInstance: BeanBase): void;
}
