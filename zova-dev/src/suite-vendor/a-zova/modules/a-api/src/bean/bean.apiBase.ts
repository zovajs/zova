import { BeanBase } from 'zova';
import { Virtual } from 'zova-module-a-bean';

@Virtual()
export class BeanApiBase extends BeanBase {
  $pathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return this.app.util.apiActionPathTranslate(pathName, pathParams);
  }

  $configPrepare(baseURL?: string, options?: any) {
    return this.app.util.apiActionConfigPrepare(baseURL, options);
  }
}
