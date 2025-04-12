import { RouterLink } from '@cabloy/vue-router';
import { BeanRenderBase, ZovaIcon } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderEssentialLink extends BeanRenderBase {
  _renderLink() {
    const domContent = [
      <ZovaIcon name={this.$props.icon} height={24} width={24}></ZovaIcon>,
      <span>{this.$props.title}</span>,
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

  render() {
    return this._renderLink();
  }
}
