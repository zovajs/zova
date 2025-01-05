import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { VIcon, VListItem, VListItemTitle } from 'vuetify/components';

@Render()
export class RenderEssentialLink extends BeanRenderBase {
  render() {
    const slots = {
      prepend: () => {
        return <VIcon icon={this.$props.icon}></VIcon>;
      },
    };
    return (
      <VListItem tag="a" href={this.$props.href} to={this.$props.to} subtitle={this.$props.caption} v-slots={slots}>
        <VListItemTitle>{this.$props.title}</VListItemTitle>
      </VListItem>
    );
  }
}
