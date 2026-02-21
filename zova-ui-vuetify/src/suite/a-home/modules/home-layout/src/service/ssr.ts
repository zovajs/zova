import { BeanBase, UseScope } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ScopeModuleASsr } from 'zova-module-a-ssr';

export interface IServiceSsrOptions {
  sidebarLeftOpenPC?: boolean;
}

@Service()
export class ServiceSsr extends BeanBase {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  options?: IServiceSsrOptions;

  protected async __init__(options?: IServiceSsrOptions) {
    this.options = options;
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (err) return;
        this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            const __themeDarkStyle=window.ssr_themedark_data;
            const __themeDarkEl=document.createElement('style');
            __themeDarkEl.setAttribute('vite-css-module-id','vuetify-theme-stylesheet');
            __themeDarkEl.innerHTML=__themeDarkStyle;
            document.head.appendChild(__themeDarkEl);
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        if (this.$$scopeSsr.config.optimization.bodyReadyObserver) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  ${this.options?.sidebarLeftOpenPC ? this._getJsHandlerSidebar() : ''}
  ${this._getJsHandlerPageContainer()}
  window.ssr_body_ready_handler=()=>{
    ${this.options?.sidebarLeftOpenPC ? 'window.ssr_body_ready_handler_sidebar();' : ''}
    window.ssr_body_ready_handler_pageContainer();
  };
  window.ssr_body_ready_condition=()=>{
    const __domPageContainer=document.querySelector('#q-app>.v-application>.v-application__wrap>main.v-main');
    return __domPageContainer;
  };
  window.ssr_body_ready_callback=()=>{
    window.ssr_body_ready_handler();
    document.querySelector('#__leftDrawerOpenJS').remove();
  };
</script>`.replaceAll('\n', '');
        }
      });
    }
  }

  private _getJsHandlerPageContainer() {
    return `window.ssr_body_ready_handler_pageContainer=()=>{
  };`;
  }

  private _getJsHandlerSidebar() {
    return `window.ssr_body_ready_handler_sidebar=()=>{
      const __belowBreakpoint=document.documentElement.clientWidth <= ${this.sys.config.layout.sidebar.breakpoint};
      let __leftDrawerOpen;
      if(__belowBreakpoint){
        __leftDrawerOpen=false;
      }else{
        const __leftDrawerOpenPC=window.ssr_load_local('sidebarLeftOpenPC');
        __leftDrawerOpen=__leftDrawerOpenPC!==undefined?__leftDrawerOpenPC:${this.sys.config.layout.sidebar.leftOpenPC};
      }
      const __domHeader=document.querySelector('#q-app>.v-application>.v-application__wrap>header.v-toolbar');
      const __domDrawer=document.querySelector('#q-app>.v-application>.v-application__wrap>.v-navigation-drawer--left');
      const __domPageContainer=document.querySelector('#q-app>.v-application>.v-application__wrap>main.v-main');
      if(__leftDrawerOpen){
        __domHeader.style.left='360px';
        __domHeader.style.width='calc(100% - 360px)';
        __domDrawer.style.transform='translateX(0px)';
        __domDrawer.style.width='360px';
        __domPageContainer.style.setProperty('--v-layout-left','360px');
        __domPageContainer.style.setProperty('--v-layout-top','112px');
        window.__mainStyleLayoutLeft='360px';
        window.__mainStyleLayoutTop='112px';
      }else{
        __domPageContainer.style.setProperty('--v-layout-left','0px');
        __domPageContainer.style.setProperty('--v-layout-top','112px');
        window.__mainStyleLayoutLeft='0px';
        window.__mainStyleLayoutTop='112px';
      }
    };`;
  }
}
