import { Service } from 'zova';
import { BeanServiceBase } from 'zova-module-a-api';

export interface ServiceMenuEntity {
  key: string;
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
  folder?: boolean;
  separator?: boolean;
  children?: ServiceMenuEntity[];
}

@Service()
export class ServiceMenu extends BeanServiceBase {
  select() {
    return this.$api.get<any, ServiceMenuEntity[]>('/home/layout/menu/select');
  }
}
