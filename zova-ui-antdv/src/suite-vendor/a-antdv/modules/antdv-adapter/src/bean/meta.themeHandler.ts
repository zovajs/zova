import { BeanBase } from 'zova';
import { Meta } from 'zova-module-a-meta';
import { IThemeHandler, IThemeHandlerApplyParams } from 'zova-module-a-style';

@Meta()
export class MetaThemeHandler extends BeanBase implements IThemeHandler {
  async apply({ token: _token }: IThemeHandlerApplyParams): Promise<void> {
    // do nothing
  }
}
