import { BeanBase, Virtual } from 'zova';

@Virtual()
export class BeanServiceBase extends BeanBase {
  $pathTranslate(pathName: string, pathParams?: Record<string, any>): string {
    return this.app.util.apiServiceActionPathTranslate(pathName, pathParams);
  }

  $configPrepare(baseURL?: string, options?: any) {
    return this.app.util.apiServiceActionConfigPrepare(baseURL, options);
  }
}
