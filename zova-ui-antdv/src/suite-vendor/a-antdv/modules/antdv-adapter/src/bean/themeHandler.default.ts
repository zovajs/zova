import { BeanBase, ThemeHandler } from 'zova';
import { ScopeModule } from '../.metadata/this.js';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

@ThemeHandler()
export class ThemeHandlerDefault extends BeanBase<ScopeModule> implements IThemeHandler {
  async apply({ token: _token }: IThemeHandlerApplyParams): Promise<void> {
    // do nothing
  }
}
