import { VBtn, VList, VListItem, VMenu } from 'vuetify/components';
import { BeanRenderBase, ClientOnly } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderUser extends BeanRenderBase {
  public render() {
    const slots = {
      activator: ({ props }) => {
        return <VBtn {...props} prependIcon={this.$passport.user?.avatar as any} variant="text">{this.$passport.user?.name}</VBtn>;
      },
    };
    return (
      <VMenu v-slots={slots}>
        <ClientOnly>
          <VList>
            <VListItem
              title={this.scope.locale.Logout()}
              onClick={() => {
                this.$passport.logout().mutate();
              }}
            ></VListItem>

          </VList>
        </ClientOnly>
      </VMenu>
    );
  }
}
