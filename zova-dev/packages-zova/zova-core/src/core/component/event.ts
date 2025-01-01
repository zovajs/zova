import { compose } from '@cabloy/compose';
import { BeanSimple } from '../../bean/beanSimple.js';
import {
  IEventRecord,
  IEventResultRecord,
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
  ): TypeEventHandlers<IEventRecord[K], IEventResultRecord[K]> {
    let eventHandlers = this.eventHandlersMap[eventName];
    if (!eventHandlers) {
      eventHandlers = this.eventHandlersMap[eventName] = [] as any;
    }
    return eventHandlers;
  }

  async emit<K extends keyof IEventRecord>(
    eventName: K,
    data?: IEventRecord[K],
    nextOrDefault?: NextEvent<IEventRecord[K], IEventResultRecord[K]> | IEventResultRecord[K],
  ): Promise<IEventResultRecord[K]> {
    const eventHandlers = this.getEventHandlers(eventName);
    if (eventHandlers.length === 0) {
      return typeof nextOrDefault === 'function'
        ? ((await cast<NextEvent<IEventRecord[K], IEventResultRecord[K]>>(nextOrDefault)(
            data,
          )) as IEventResultRecord[K])
        : (nextOrDefault! as IEventResultRecord[K]);
    }
    // invoke
    const next =
      typeof nextOrDefault === 'function'
        ? cast<NextEvent<IEventRecord[K], IEventResultRecord[K]>>(nextOrDefault)
        : async (): Promise<IEventResultRecord[K]> => {
            return nextOrDefault! as IEventResultRecord[K];
          };
    return await compose(eventHandlers.concat(), __adapter)(data, next);
  }

  on<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventHandler<IEventRecord[K], IEventResultRecord[K]>,
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
    fn: TypeEventHandler<IEventRecord[K], IEventResultRecord[K]>,
  ): TypeEventOff {
    const off = this.on(eventName, async (data, next) => {
      const res = await fn(data, next);
      off();
      return res;
    });
    return off;
  }
}
