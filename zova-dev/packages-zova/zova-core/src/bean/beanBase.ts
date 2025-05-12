import type { Logger } from '@cabloy/logger';
import type { RendererNode, WatchHandle } from 'vue';
import type { AppEvent } from '../core/component/event.js';
import type { ILoggerClientChildRecord } from '../core/logger/types.js';
import type { FunctionAsync } from '../decorator/type/functionable.js';
import type { IErrorHandlerEventResult, IModuleLocaleText } from './resource/index.js';
import { markRaw } from 'vue';
import { createZovaComponentAsync } from '../components/createZovaComponentAsync.js';
import { cast } from '../types/utils/cast.js';
import { BeanBaseSimple, SymbolBeanFullName, SymbolModuleBelong } from './beanBaseSimple.js';
import { getVueDecoratorValue } from './vueDecorators/utils.js';

const SymbolText = Symbol('SymbolText');
const SymbolLogger = Symbol('SymbolLogger');
const SymbolLoggerChildren = Symbol('SymbolLoggerChildren');
const SymbolZovaComponents = Symbol('SymbolZovaComponents');

export class BeanBase extends BeanBaseSimple {
  private [SymbolText]: IModuleLocaleText;
  private [SymbolLogger]: Logger;
  private [SymbolLoggerChildren]: Record<string, Logger> = {};
  private [SymbolZovaComponents]: Record<string, any> = {};

  protected get $el(): RendererNode {
    if (!this.ctx) {
      throw new Error('$el can not be used inside global bean.');
    }
    return this.ctx.meta.el;
  }

  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this[SymbolModuleBelong]);
    }
    return this[SymbolText];
  }

  protected get $logger() {
    if (!this[SymbolLogger]) {
      this[SymbolLogger] = this.sys.meta.logger.get().child({ beanFullName: this[SymbolBeanFullName] });
    }
    return this[SymbolLogger];
  }

  protected $loggerChild(childName: keyof ILoggerClientChildRecord) {
    if (!this[SymbolLoggerChildren][childName]) {
      this[SymbolLoggerChildren][childName] = this.$logger.child({ name: childName });
    }
    return this[SymbolLoggerChildren][childName];
  }

  protected get $event(): AppEvent {
    return this.app.meta.event;
  }

  // need not
  // protected async __init__() {}
  // protected __dispose__() {}

  public get scope(): unknown {
    return this.bean.scope(this[SymbolModuleBelong]);
  }

  protected $watchHandle(prop: string | Function, index?: number): WatchHandle {
    if (typeof prop === 'function') {
      prop = prop.name;
    }
    return getVueDecoratorValue(this, prop, index ?? 0);
  }

  protected $renderFreeze(freeze: boolean) {
    return cast(this.ctx.instance).ctx.renderFreeze(freeze);
  }

  protected async $renderFreezeScope<RESULT>(fn: FunctionAsync<RESULT>): Promise<RESULT> {
    return await cast(this.ctx.instance).ctx.renderFreezeScope(fn);
  }

  protected $onCreated(fn: any) {
    this.ctx.meta.hooks.onCreated(fn);
  }

  protected $onMounted(fn: any) {
    this.ctx.meta.hooks.onMounted(fn);
  }

  protected $errorHandler(err: unknown, info?: string): IErrorHandlerEventResult {
    return this.app?.vue.config.errorHandler!(err, this.ctx.instance as any, info!) as unknown as IErrorHandlerEventResult;
  }

  protected $zovaComponent(module: string, name?: string) {
    const componentName = module.includes(':') ? module : `${module}:${name}`;
    if (!this[SymbolZovaComponents][componentName]) {
      this[SymbolZovaComponents][componentName] = markRaw(createZovaComponentAsync(componentName));
    }
    return this[SymbolZovaComponents][componentName];
  }

  // need not
  // public dispose() {
  //   const self = cast(this);
  //   if (self.__dispose__) {
  //     self.__dispose__();
  //   }
  // }
}
