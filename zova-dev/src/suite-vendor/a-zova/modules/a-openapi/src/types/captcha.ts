export interface ICaptchaSceneRecord {
  'a-captchasimple:simple': never;
}

export interface ICaptchaOptions {
  scene?: keyof ICaptchaSceneRecord;
}
