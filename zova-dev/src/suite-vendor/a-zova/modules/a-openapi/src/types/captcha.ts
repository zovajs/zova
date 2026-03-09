export interface ICaptchaSceneRecord {
  'captcha-simple:simple': never;
}

export interface ICaptchaProviderRecord {}

export interface ICaptchaOptions {
  scene?: keyof ICaptchaSceneRecord;
}

export interface ICaptchaData {
  id: string;
  provider: keyof ICaptchaProviderRecord | string;
  token?: unknown;
  payload?: unknown;
}
