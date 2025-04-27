import { BeanModelBase, Model } from 'zova-module-a-model';

@Model()
export class ModelTestSchema extends BeanModelBase {
  testSchema() {
    return this.$useStateData({
      queryKey: ['testSchema'],
      queryFn: async () => {
        const data = await this.$api.testSsrToolOne.testSchema({ id: 1, name: 'Tom', married: true, details: [] }, {
          params: { id: 1 },
          query: { name: 'Tom' },
        });
        return data;
      },
    });
  }
}
