import { VMain } from 'vuetify/components';
import { BeanBase } from 'zova';
import { Sys } from 'zova-module-a-bean';

@Sys()
export class SysMain extends BeanBase {
  public async initialize() {
    this._patchSetup();
  }

  private _patchSetup() {
    const self = this;
    VMain.setup = function (props, { attrs, slots }) {

    };
  }
}
