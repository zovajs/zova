import { RouterLink } from '@cabloy/vue-router';
import { BeanRenderBase, ZIcon } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderEssentialLink extends BeanRenderBase {
  _renderLink() {
    const domContent = [
      <ZIcon name={this.$props.icon}></ZIcon>,
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
