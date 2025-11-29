import type { IJwtInfo } from 'zova-module-a-interceptor';
import type { IDecoratorModelOptions } from 'zova-module-a-model';
import type { ApiApiHomeUserPassportloginRequestBody, ApiApiHomeUserPassportloginResponseBody } from 'zova-module-home-api';
import { BeanModelBase, Model } from 'zova-module-a-model';

export interface IModelOptionsPassport extends IDecoratorModelOptions {}

@Model<IModelOptionsPassport>()
export class ModelPassport extends BeanModelBase {
  passport?: ApiApiHomeUserPassportloginResponseBody['passport'];
  jwt?: ApiApiHomeUserPassportloginResponseBody['jwt'];
  accessToken?: string;
  expireTime?: number;

  protected async __init__() {
    this.passport = process.env.CLIENT
      ? this.$useStateLocal({ queryKey: ['passport'] })
      : this.$useStateMem({ queryKey: ['passport'] });
    this.jwt = this.$useStateLocal({ queryKey: ['jwt'] });
    this.expireTime = this.$useStateLocal({ queryKey: ['expireTime'] });
    this.accessToken = this.$useStateCookie({ queryKey: ['token'] });
    if (process.env.CLIENT) {
      this._setLocaleTz();
    }
  }

  login() {
    return this.$useMutationData<ApiApiHomeUserPassportloginResponseBody, ApiApiHomeUserPassportloginRequestBody>({
      mutationKey: ['login'],
      mutationFn: async params => {
        return this.$api.homeUserPassport.login(params, { authToken: false });
      },
      onSuccess: data => {
        // save
        this._setPassportJwt(data);
        // page: returnTo
        this.app.$gotoReturnTo();
      },
    });
  }

  logout() {
    return this.$useMutationData<void, void>({
      mutationKey: ['logout'],
      mutationFn: async () => {
        await this.$api.homeUserPassport.logout();
      },
      onSuccess: () => {
        // clear
        this.$clear(); // not await
        this._setPassportJwt();
        // page: login
        this.app.$gotoLogin();
      },
    });
  }

  get isAuthenticated(): boolean {
    return !!this.passport;
    // return !!this.accessToken && !!this.expireTime && this.expireTime > Date.now();
  }

  get user() {
    return this.passport?.user;
  }

  async getJwtInfo(): Promise<IJwtInfo | undefined> {
    if (!this.accessToken) return undefined;
    return {
      accessToken: this.accessToken,
      refreshToken: this.jwt?.refreshToken,
      expiresIn: this.jwt?.expiresIn,
      expireTime: this.expireTime,
    };
  }

  async refreshAuthToken(refreshToken: string): Promise<IJwtInfo> {
    const jwt = await this.$api.homeUserPassport.refreshAuthToken({ refreshToken }, { authToken: false });
    this._setJwt(jwt);
    return (await this.getJwtInfo())!;
  }

  async ensurePassport() {
    if (process.env.CLIENT) return this.passport;
    if (!this.isAuthenticated && this.accessToken) {
      this.passport = await this.$api.homeUserPassport.current();
      this._setLocaleTz();
    }
    return this.passport;
  }

  private _setLocaleTz() {
    const user = this.passport?.user;
    if (!user) return;
    // locale
    if (user.locale) {
      const cookieLocale = this.app.meta.cookie.getItem(this.sys.config.locale.storeKey);
      if (!cookieLocale) {
        this.app.meta.locale.current = user.locale as any;
      }
    }
    // tz
    if (user.tz) {
      const cookieTz = this.app.meta.cookie.getItem(this.sys.config.tz.storeKey);
      if (!cookieTz) {
        this.app.meta.locale.tz = user.tz;
      }
    }
  }

  private _setPassportJwt(data?: ApiApiHomeUserPassportloginResponseBody) {
    this._setPassport(data?.passport);
    this._setJwt(data?.jwt);
  }

  private _setPassport(passport?: ApiApiHomeUserPassportloginResponseBody['passport']) {
    if (passport) {
      this.passport = passport;
    } else {
      this.passport = undefined;
    }
  }

  private _setJwt(jwt?: ApiApiHomeUserPassportloginResponseBody['jwt']) {
    if (jwt) {
      this.jwt = jwt;
      this.expireTime = Date.now() + (jwt.expiresIn - this.scope.config.passport.accessToken.expireTimeDelay) * 1000;
      this.accessToken = jwt.accessToken;
    } else {
      this.jwt = undefined;
      this.expireTime = undefined;
      this.accessToken = undefined;
    }
  }
}
