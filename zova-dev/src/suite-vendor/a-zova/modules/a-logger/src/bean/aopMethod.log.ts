import type { Next, NextSync } from 'zova';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'zova-module-a-bean';
import { BeanAopMethodBase } from 'zova';
import { AopMethod } from 'zova-module-a-bean';

export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {}

@AopMethod<IAopMethodOptionsLog>()
export class AopMethodLog extends BeanAopMethodBase implements IAopMethodExecute {
  execute(_options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    // todo: 尚未完成
    console.log('----log');
    // next
    return next();
  }
}
