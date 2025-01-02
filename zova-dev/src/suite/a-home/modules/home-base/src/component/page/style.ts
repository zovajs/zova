import { BeanStyleBase } from 'zova';
import { Local } from 'zova-module-a-bean';
import type { ControllerPage } from './controller.js';

export interface StylePage extends ControllerPage {}

@Local()
export class StylePage extends BeanStyleBase {
  cPage: string;

  protected async __init__() {
    this.cPage = this.$style({
      padding: '16px',
    });
  }
}
