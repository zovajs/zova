import { BeanBase, Theme } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { ThemeApplyParams, ThemeApplyResult, ThemeBase } from 'zova-module-a-style';
import { ThemeToken } from '../themeToken.js';

@Theme()
export class ThemeDefault extends BeanBase<ScopeModule> implements ThemeBase {
  async apply({ name: _name, dark: _dark }: ThemeApplyParams): Promise<ThemeApplyResult> {
    const token: ThemeToken = {};
    return { token };
  }
}
