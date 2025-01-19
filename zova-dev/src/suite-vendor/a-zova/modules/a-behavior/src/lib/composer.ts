import { BeanSimple } from 'zova';
import { NextBehavior } from '../types/behavior.js';
import { VNode } from 'vue';
import { TypeComposer } from 'zova-module-a-bean';

export class Composer extends BeanSimple {
  private _composer: TypeComposer;

  protected async __init__(composer: TypeComposer) {
    this._composer = composer;
  }

  public execute<PROPS_INPUT, PROPS_OUTPUT = PROPS_INPUT>(props: PROPS_INPUT, next: NextBehavior<PROPS_OUTPUT>): VNode {
    return this._composer(props, next);
  }
}
