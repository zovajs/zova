import { BeanSimple } from '../beanSimple.js';

const BeanModuleScope = Symbol('BeanScopeScene#ModuleScope');

export class BeanScopeUtil extends BeanSimple {
  private [BeanModuleScope]: string;

  constructor(moduleScope) {
    super();
    this[BeanModuleScope] = moduleScope;
  }

  test() {
    return this[BeanModuleScope];
  }
}
