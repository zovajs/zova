import { CmdOptions } from 'zova-cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateBean extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'bean');
  }
}
