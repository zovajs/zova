import { BeanModelBase, Model } from 'zova-module-a-model';
import { ApiApiHomeUserPassportloginResponseBody } from 'zova-module-home-api';

@Model()
export class ModelPassport extends BeanModelBase {
  passport?: ApiApiHomeUserPassportloginResponseBody;
  token?: string;

  protected async __init__() {
    this.passport = this.$useStateLocal({
      queryKey: ['passport'],
    });
    this.token = this.$useStateCookie({
      queryKey: ['token'],
    });
  }
}
