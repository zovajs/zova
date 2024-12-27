import { Service } from 'zova';
import { BeanServiceBase } from 'zova-module-a-api';

export interface ServiceBookEchoResult {
  message: string;
}

@Service()
export class ServiceBook extends BeanServiceBase {
  echo() {
    return this.$api.get<any, ServiceBookEchoResult>('/book/echo');
  }
}
