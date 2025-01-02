import { BeanServiceBase, Service } from 'zova-module-a-api';

export interface ServiceExampleEchoResult {
  message: string;
}

@Service()
export class ServiceExample extends BeanServiceBase {
  echo() {
    return this.$api.get<any, ServiceExampleEchoResult>('/example/echo');
  }
}
