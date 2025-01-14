import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import {
  ElAside,
  ElConfigProvider,
  ElContainer,
  ElHeader,
  ElIcon,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
} from 'element-plus';
import { RouterView } from 'vue-router';
import { ApiMenuEntity } from '../../api/menu.js';
import { VNode } from 'vue';

@Render()
export class RenderLayoutDefault extends BeanRenderBase {
  _renderMenuItem(item: ApiMenuEntity) {
    // folder
    if (item.folder) {
      const slots = {
        title: () => {
          return <span>{item.title}</span>;
        },
      };
      const domItems = this._renderMenuItems(item.children);
      return (
        <ElSubMenu key={item.key} index={item.key} v-slots={slots}>
          {domItems}
        </ElSubMenu>
      );
    }
    // item
    const slots = {
      title: () => {
        return (
          <div>
            <ElIcon>{item.icon}</ElIcon>
            <span>{item.title}</span>
          </div>
        );
      },
    };
    return (
      <ElMenuItem
        key={item.key}
        index={item.key}
        v-slots={slots}
        onClick={() => {
          if (item.href) {
            window.open(item.href);
          } else {
            this.$router.push(item.to!);
          }
        }}
      ></ElMenuItem>
    );
  }
  _renderMenuItems(items: ApiMenuEntity[] | undefined) {
    if (!items) return [];
    const domItems: VNode[] = [];
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      domItems.push(this._renderMenuItem(item));
    }
    return domItems;
  }
  _renderMenu() {
    const queryMenus = this.$$modelMenu.select();
    if (queryMenus.isLoading) return;
    const domItems = this._renderMenuItems(queryMenus.data);
    return (
      <ElMenu
        class={this.cMenuVerticalDemo}
        collapse={this.leftDrawerOpen}
        defaultActive={this.activeMenuItemKey}
        defaultOpeneds={this.activeMenuSubKeys}
      >
        {domItems}
      </ElMenu>
    );
  }

  _renderHeader() {
    return (
      <ElMenu class="el-menu-demo" mode="horizontal">
        <ElMenuItem index="1">Element Plus</ElMenuItem>
      </ElMenu>
    );
  }

  render() {
    return (
      <ElConfigProvider>
        <ElContainer>
          <ElHeader>{this._renderHeader()}</ElHeader>
          <ElContainer class={this.cMainContainer}>
            <ElAside>{this._renderMenu()}</ElAside>
            <ElMain>
              <RouterView />
            </ElMain>
          </ElContainer>
        </ElContainer>
      </ElConfigProvider>
    );
  }
}
