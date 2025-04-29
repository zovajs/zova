import { RouterLink } from '@cabloy/vue-router';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZovaIcon } from 'zova-module-a-icon';

export interface ControllerEssentialLinkProps {
  title: string;
  description?: string;
  icon?: string;
  href?: string;
  to?: string | object;
}

@Controller()
export class ControllerEssentialLink extends BeanControllerBase {
  static $propsDefault = {
    description: '',
    icon: '',
  };

  _renderLink() {
    const domContent = [
      <ZovaIcon name={this.$props.icon} height={24} width={24}></ZovaIcon>,
      <div>
        <div>{this.$props.title}</div>
        {this.$props.description && <div class="text-gray-400">{this.$props.description}</div>}
      </div>,
    ];
    if (this.$props.href) {
      return (
        <a href={this.$props.href} target="_blank">
          {domContent}
        </a>
      );
    }
    if (!this.$props.to) {
      return (
        <a href="#">
          {domContent}
        </a>
      );
    }
    return <RouterLink to={this.$props.to}>{domContent}</RouterLink>;
  }

  protected render() {
    return this._renderLink();
  }
}
