import { RouterLink } from '@cabloy/vue-router';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IIconRecord, ZIcon } from 'zova-module-a-icon';

export interface ControllerItemLinkProps {
  title: string;
  description?: string;
  icon?: keyof IIconRecord;
  href?: string;
  to?: string | object;
}

@Controller()
export class ControllerItemLink extends BeanControllerBase {
  static $propsDefault = {
    description: '',
    icon: '',
  };

  _renderLink() {
    const domContent = [<ZIcon name={this.$props.icon} height={24} width={24}></ZIcon>, <span>{this.$props.title}</span>];
    if (this.$props.href) {
      return (
        <a href={this.$props.href} target="_blank">
          {domContent}
        </a>
      );
    }
    return <RouterLink to={this.$props.to!}>{domContent}</RouterLink>;
  }

  protected render() {
    return this._renderLink();
  }
}
