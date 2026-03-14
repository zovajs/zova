import type { IAopMethodOptionsLog } from '../bean/aopMethod.log.js';
import { UseAopMethod } from 'zova-module-a-bean';

export function Log(options?: Partial<IAopMethodOptionsLog>): MethodDecorator {
  return UseAopMethod('a-logger:log', options);
}
