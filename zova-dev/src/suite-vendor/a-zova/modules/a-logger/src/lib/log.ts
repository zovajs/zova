import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.js';
import { UseAopMethod } from 'zova-module-a-bean';

export function Transaction(options?: Partial<IAopMethodOptionsLog>): MethodDecorator {
  return UseAopMethod('a-logger:log', options);
}
