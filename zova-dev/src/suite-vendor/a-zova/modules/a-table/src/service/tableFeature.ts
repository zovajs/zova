import { BeanBase, Use } from 'zova';
import { Service, SysOnion } from 'zova-module-a-bean';
import { BeanTableFeatureBase } from '../lib/beanTableFeatureBase.js';

@Service()
export class ServiceTableFeature extends BeanBase {
  @Use()
  $$sysOnion: SysOnion;

  async loadTableFeatures(
  ): Promise<BeanTableFeatureBase[] | undefined> {
    const onionSlices = await this.$$sysOnion.tableFeature.loadOnionsFromPackage();
    if (!onionSlices || onionSlices.length === 0) return undefined;
    const beanInstances: BeanTableFeatureBase[] = [];
    for (const onionSlice of onionSlices) {
      const beanInstance = await this.sys.bean._getBean(onionSlice.beanFullName as any, true);
      beanInstances.push(beanInstance);
    }
    return beanInstances;
  }
}
