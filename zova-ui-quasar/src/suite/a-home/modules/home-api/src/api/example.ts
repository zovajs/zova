import { BeanApiBase, Api } from 'zova-module-a-api';

export interface ApiExampleEchoResult {
  message: string;
}

@Api()
export class ApiExample extends BeanApiBase {
  echo() {
    return this.$fetch.get<any, ApiExampleEchoResult>('/example/echo');
  }
}
