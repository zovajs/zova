import { BeanRenderBase, ZovaIcon } from 'zova';
import { Render } from 'zova-module-a-bean';
import type { ControllerEssentialLink } from './controller.js';
import { RouterLink } from 'vue-router';

@Render()
export class RenderEssentialLink extends BeanRenderBase {
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

  public render() {
    return this._renderLink();
  }
}
