import { CmdOptions } from '@cabloy/cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliBeanStore extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'store');
  }
}
