import { Service } from 'zova';
import { BeanServiceBase } from 'zova-module-a-api';

export interface ServiceExampleEchoResult {
  message: string;
}

@Service()
export class ServiceExample extends BeanServiceBase {
  echo() {
    return this.$api.get<any, ServiceExampleEchoResult>('/example/echo');
  }
}
