import { MESSAGE } from './types.ts';

export class Printf {
  template: any;
  constructor(templateFn) {
    this.template = templateFn;
  }

  transform(info) {
    info[MESSAGE] = this.template(info);
    return info;
  }
}

export function print(opts) {
  return new Printf(opts);
}
