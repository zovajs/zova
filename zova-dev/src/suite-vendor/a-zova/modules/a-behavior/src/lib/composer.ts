import { BeanSimple } from 'zova';
import { IBehaviorTag, NextBehaviorProps, NextBehaviorRender, TypeComposer } from '../types/behavior.js';
import { VNode } from 'vue';

export class Composer extends BeanSimple {
  private _composer: TypeComposer;
  private _behaviorTag: IBehaviorTag;

  protected async __init__(composer: TypeComposer, behaviorTag: IBehaviorTag) {
    this._composer = composer;
    this._behaviorTag = behaviorTag;
  }

  public props<PROPS>(next: NextBehaviorProps<PROPS>): PROPS {
    return this._composer({ behaviorTag: this._behaviorTag, method: 'props' }, next);
  }

  public render<PROPS>(props: PROPS, next: NextBehaviorRender): VNode {
    return this._composer({ behaviorTag: this._behaviorTag, method: 'render', props }, next);
  }
}
