import { VIcon } from 'vuetify/components/VIcon';
import { VListItem, VListItemTitle } from 'vuetify/components/VList';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IIconRecord } from 'zova-module-a-icon';

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
    const slots = {
      prepend: () => {
        return <VIcon icon={this.$props.icon}></VIcon>;
      },
    };
    return (
      <VListItem tag="a" href={this.$props.href} to={this.$props.to} subtitle={this.$props.description} v-slots={slots}>
        <VListItemTitle>{this.$props.title}</VListItemTitle>
      </VListItem>
    );
  }

  protected render() {
    return this._renderLink();
  }
}
