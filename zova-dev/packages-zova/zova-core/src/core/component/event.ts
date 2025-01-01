import { compose } from '@cabloy/compose';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IEventRecord,
  NextEvent,
  TypeEventHandler,
  TypeEventHandlers,
  TypeEventHandlersMap,
  TypeEventOff,
} from '../../types/interface/event.js';
import { cast } from '../../types/utils/cast.js';

const __adapter = (_context, chain) => {
  const eventHandlerWrapper = chain;
  if (!eventHandlerWrapper.fn) return;
  return {
    receiver: undefined,
    fn: eventHandlerWrapper.fn,
  };
};

export class AppEvent extends BeanSimple {
  private eventHandlersMap = {} as TypeEventHandlersMap<keyof IEventRecord>;

  /** @internal */
  public async initialize() {}

  public getEventHandlers<K extends keyof IEventRecord>(
    eventName: K,
  ): TypeEventHandlers<IEventRecord[K]['data'], IEventRecord[K]['result']> {
    let eventHandlers = this.eventHandlersMap[eventName];
    if (!eventHandlers) {
      eventHandlers = this.eventHandlersMap[eventName] = [] as any;
    }
    return eventHandlers;
  }

  async emit<K extends keyof IEventRecord>(
    eventName: K,
    data?: IEventRecord[K]['data'],
    nextOrDefault?: NextEvent<IEventRecord[K]['data'], IEventRecord[K]['result']> | IEventRecord[K]['result'],
  ): Promise<IEventRecord[K]['result']> {
    const eventHandlers = this.getEventHandlers(eventName);
    if (eventHandlers.length === 0) {
      return typeof nextOrDefault === 'function'
        ? ((await cast<NextEvent<IEventRecord[K]['data'], IEventRecord[K]['result']>>(nextOrDefault)(
            data,
          )) as IEventRecord[K]['result'])
        : (nextOrDefault! as IEventRecord[K]['result']);
    }
    // invoke
    const next =
      typeof nextOrDefault === 'function'
        ? cast<NextEvent<IEventRecord[K]['data'], IEventRecord[K]['result']>>(nextOrDefault)
        : async (): Promise<IEventRecord[K]['result']> => {
            return nextOrDefault! as IEventRecord[K]['result'][K];
          };
    return await compose(eventHandlers.concat(), __adapter)(data, next);
  }

  on<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventHandler<IEventRecord[K]['data'], IEventRecord[K]['result']>,
  ): TypeEventOff {
    const eventHandlers = this.getEventHandlers(eventName);
    eventHandlers.push({ fn });
    return () => {
      const index = eventHandlers.findIndex(item => item.fn === fn);
      if (index > -1) {
        eventHandlers[index].fn = undefined;
        eventHandlers.splice(index, 1);
      }
    };
  }

  once<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventHandler<IEventRecord[K]['data'], IEventRecord[K]['result']>,
  ): TypeEventOff {
    const off = this.on(eventName, async (data, next) => {
      const res = await fn(data, next);
      off();
      return res;
    });
    return off;
  }
}
