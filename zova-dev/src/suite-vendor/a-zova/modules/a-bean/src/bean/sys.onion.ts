import type {
  IOnionOptionsEnable,
  IOnionOptionsMatch,
  IOnionOptionsMeta,
  TypeOnionOptionsMatchRules,
} from '../types/onion.js';
import { checkMeta } from '@cabloy/utils';
import { matchSelector } from '@cabloy/word-utils';
import { BeanBase, ProxyDisable } from 'zova';
import { Sys } from '../lib/bean.js';
import { ServiceOnion } from '../service/onion_.js';

@ProxyDisable()
@Sys()
export class SysOnion extends BeanBase {
  private __instances: Record<string, any> = {};

  protected __get__(prop: string) {
    if (process.env.DEV && this.bean.containerType !== 'sys') {
      throw new Error('should in sys container');
    }
    if (!this.__instances[prop]) {
      this.__instances[prop] = this.bean._newBeanSimple(ServiceOnion, false, prop, this);
    }
    return this.__instances[prop];
  }

  public checkOnionOptionsEnabled(
    options: IOnionOptionsEnable & IOnionOptionsMatch<any>,
    selector?: string | boolean,
    matchThis?: any,
    ...matchArgs: any[]
  ) {
    if (options.enable === false) return false;
    if (!this.checkOnionOptionsMeta(options.meta)) return false;
    if (!selector) return true;
    if (!options.match && !options.ignore) return true;
    return (
      (options.match && __onionMatchSelector(options.match, selector, matchThis, ...matchArgs)) ||
      (options.ignore && !__onionMatchSelector(options.ignore, selector, matchThis, ...matchArgs))
    );
  }

  public checkOnionOptionsMeta(meta?: IOnionOptionsMeta) {
    return checkMeta(meta, this.sys.config.meta);
  }
}

function __onionMatchSelector(match: TypeOnionOptionsMatchRules<string>, selector: string | boolean, matchThis: any, ...matchArgs: any[]) {
  return matchSelector(match, selector, matchThis, ...matchArgs);
}
