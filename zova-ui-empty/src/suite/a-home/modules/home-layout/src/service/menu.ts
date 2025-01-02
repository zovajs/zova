import { BeanServiceBase, Service } from 'zova-module-a-api';

export interface ServiceMenuEntity {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
  folder?: boolean;
  separator?: boolean;
}

@Service()
export class ServiceMenu extends BeanServiceBase {
  select() {
    return this.$api.get<any, ServiceMenuEntity[]>('/home/layout/menu/select');
  }
}
