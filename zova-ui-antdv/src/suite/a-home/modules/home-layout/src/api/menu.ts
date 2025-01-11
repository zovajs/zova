import { BeanApiBase, Api } from 'zova-module-a-api';

export interface ApiMenuEntity {
  key: string;
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
  folder?: boolean;
  separator?: boolean;
  children?: ApiMenuEntity[];
}

@Api()
export class ApiMenu extends BeanApiBase {
  select() {
    return this.$fetch.get<any, ApiMenuEntity[]>('/home/layout/menu/select');
  }
}
