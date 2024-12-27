import { BeanServiceBase } from 'zova-module-home-api';

export interface ServiceMenuEntity {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: { name?: string } | string;
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
