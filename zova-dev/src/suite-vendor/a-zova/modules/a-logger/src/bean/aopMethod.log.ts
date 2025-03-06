import type { ILoggerClientChildRecord, ILoggerClientRecord, Next, NextSync } from 'zova';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'zova-module-a-bean';
import { LoggerLevel, Profiler } from '@cabloy/logger';
import { evaluateExpressions } from '@cabloy/utils';
import { BeanAopMethodBase, SymbolBeanFullName } from 'zova';
import { AopMethod } from 'zova-module-a-bean';

export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {
  level: LoggerLevel;
  childName?: keyof ILoggerClientChildRecord;
  clientName?: keyof ILoggerClientRecord;
  auto?: boolean;
  args?: boolean;
  result?: boolean;
  context?: Record<string, any>;
}

@AopMethod<IAopMethodOptionsLog>({
  level: 'info',
})
export class AopMethodLog extends BeanAopMethodBase implements IAopMethodExecute {
  get(options: IAopMethodOptionsLog, next: NextSync, receiver: any, prop: string): string {
    const context = this._getContext(options, receiver);
    const message = `${receiver[SymbolBeanFullName]}#get ${prop}`;
    const logger = this.app.meta.logger.child(options.childName, options.clientName);
    // begin
    (!options.auto) && logger.log(options.level, message, context ? { context } : undefined);
    const profiler = logger.startTimer();
    // next
    try {
      const res = next();
      this._logResult(profiler, context, res, options, message);
      return res;
    } catch (err: any) {
      this._logError(profiler, context, err, options, message);
      throw err;
    }
  }

  set(options: IAopMethodOptionsLog, value: string, next: NextSync, receiver: any, prop: string): boolean {
    const context = this._getContext(options, receiver);
    const message = `${receiver[SymbolBeanFullName]}#set ${prop}`;
    const logger = this.app.meta.logger.child(options.childName, options.clientName);
    // begin
    logger.log(options.level, `${message} value: ${JSON.stringify(value)}`, context ? { context } : undefined);
    const profiler = logger.startTimer();
    // next
    try {
      const res = next();
      (!options.auto) && this._logResult(profiler, context, undefined, options, message);
      return res;
    } catch (err: any) {
      this._logError(profiler, context, err, options, message);
      throw err;
    }
  }

  execute(options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, receiver: any, prop: string): Promise<any> | any {
    const context = this._getContext(options, receiver);
    const message = `${receiver[SymbolBeanFullName]}#${prop}`;
    const logger = this.app.meta.logger.child(options.childName, options.clientName);
    // begin
    options.args !== false && logger.log(options.level, `${message} args: ${JSON.stringify(_args)}`, context ? { context } : undefined);
    const profiler = logger.startTimer();
    // next
    try {
      const res = next();
      if (res?.then) {
        return res.then((res: any) => {
          options.result !== false && this._logResult(profiler, context, res, options, message);
          return res;
        }).catch((err: Error) => {
          this._logError(profiler, context, err, options, message);
          throw err;
        });
      }
      options.result !== false && this._logResult(profiler, context, res, options, message);
      return res;
    } catch (err: any) {
      this._logError(profiler, context, err, options, message);
      throw err;
    }
  }

  _getContext(options: IAopMethodOptionsLog, receiver: any) {
    return evaluateExpressions(options.context, receiver);
  }

  _logResult(profiler: Profiler, context: any, res: any, options: IAopMethodOptionsLog, message: string) {
    const textResult = res !== undefined ? ` result: ${JSON.stringify(res)}` : '';
    const info: any = { level: options.level, message: `${message}${textResult}` };
    if (context) info.context = context;
    profiler.done(info);
  }

  _logError(profiler: Profiler, context: any, err: Error, _options: IAopMethodOptionsLog, message: string) {
    const textError = ` error: ${err.message}`;
    const info: any = { level: 'error', message: `${message}${textError}` };
    if (context) info.context = context;
    profiler.done(info);
  }
}
