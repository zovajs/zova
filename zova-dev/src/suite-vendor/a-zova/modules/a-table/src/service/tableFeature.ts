import { BeanBase, Use } from 'zova';
import { Service, SysOnion } from 'zova-module-a-bean';

@Service()
export class ServiceTableFeature extends BeanBase {
  @Use()
  $$sysOnion: SysOnion;
}
