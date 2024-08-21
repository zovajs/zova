import { BeanBase, Cast, Local } from 'zova';
import { ScopeModule } from '../resource/this.js';

@Local()
export class LocalSSR extends BeanBase<ScopeModule> {
  public async initialize() {
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.ssr.onHydrated(() => {
        Cast(this.app.vue.config.globalProperties.$q).onSSRHydrated();
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.ssr.context.onRendered(() => {
        this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
    if(window.ssr_local_themedark){
      document.body.classList.remove('body--light');
      document.body.classList.add('body--dark');
    }else{
      document.body.classList.remove('body--dark');
      document.body.classList.add('body--light');
    }
    document.querySelector('#__prefersColorSchemeDarkJS').remove();
</script>`.replaceAll('\n', '');
        if (this.app.config.ssr.optimization.bodyHiddenBeforeLoad) {
          this.ctx.meta.ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  document.addEventListener("DOMContentLoaded", () => {
    const __belowBreakpoint=document.documentElement.clientWidth <= ${this.app.config.layout.sidebar.breakpoint};
    let __leftDrawerOpen;
    if(__belowBreakpoint){
      __leftDrawerOpen=false;
    }else{
      const __leftDrawerOpenPC=window.ssr_load_local('sidebarLeftOpenPC');
      __leftDrawerOpen=__leftDrawerOpenPC!==undefined?__leftDrawerOpenPC:${this.app.config.layout.sidebar.leftOpenPC};  
    }
    if(__leftDrawerOpen){
      const __domHeader=document.querySelector('#q-app>.q-layout>.q-header');
      const __domDrawer=document.querySelector('#q-app>.q-layout>.q-drawer-container>.q-drawer--left');
      const __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
      __domHeader.style.left='300px';
      __domDrawer.style.transform='unset !important';
      __domDrawer.className=__domDrawer.className.replace('q-layout--prevent-focus ','');
      __domPageContainer.style.paddingLeft='300px';
      if(window.ssr_local_themedark){
      __domDrawer.classList.add('q-drawer--dark','q-dark');
      __domDrawer.querySelector('.q-list').classList.add('q-list--dark');
      __domDrawer.querySelector('.q-separator').classList.add('q-separator--dark');
      }
    }
    document.querySelector('#__leftDrawerOpenJS').remove();
  });
</script>`.replaceAll('\n', '');
        }
      });
    }
  }
}
