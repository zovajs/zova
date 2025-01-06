import { BeanControllerBase, ZovaIcon } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { RouterLink } from 'vue-router';
export interface ControllerEssentialLinkProps {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: { name?: string } | string;
}

export type ControllerEssentialLinkEmits = {};

export interface ControllerEssentialLinkSlots {}

@Controller()
export class ControllerEssentialLink extends BeanControllerBase {
  static $propsDefault = {
    caption: '',
    icon: '',
  };

  _renderLink() {
    const domContent = [
      <ZovaIcon name={this.$props.icon} height={24} width={24}></ZovaIcon>,
      <div>
        <div>{this.$props.title}</div>
        {this.$props.caption && <div class="text-gray-400">{this.$props.caption}</div>}
      </div>,
    ];
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
