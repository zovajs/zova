import { BeanBase } from 'zova';
import { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { Theme } from 'zova-module-a-style';

@Theme()
export class ThemeRed extends BeanBase {
  protected async __init__() {}
}
