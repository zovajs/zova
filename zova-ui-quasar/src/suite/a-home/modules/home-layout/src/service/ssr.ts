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
        if (!this.sys.config.ssr.cookie) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.classList.remove('body--light','body--dark');
            window.ssr_themedark_data.split(',').forEach(item=>document.body.classList.add(item));
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
        if (this.$$scopeSsr.config.optimization.bodyReadyObserver) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  ${this.options?.sidebarLeftOpenPC ? this._getJsHandlerSidebar() : ''}
  ${this._getJsHandlerPageContainer()}
  window.ssr_body_ready_handler=()=>{
    ${this.options?.sidebarLeftOpenPC ? 'window.ssr_body_ready_handler_sidebar();' : ''}
    window.ssr_body_ready_handler_pageContainer();
  };
  window.ssr_body_ready_condition=()=>{
    const __domPlaceholder=document.querySelector('.__ssr_placeholder__');
    return __domPlaceholder;
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
    const __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
    if(window.ssr_themedark){
      if(__domPageContainer){
        const __domCards=__domPageContainer.querySelectorAll('.q-card');
        __domCards.forEach(item=>item.classList.add('q-card--dark','q-dark'));
        const __domFields=__domPageContainer.querySelectorAll('.q-field');
        __domFields.forEach(item=>item.classList.add('q-field--dark'));
      }
    }
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
    if(__leftDrawerOpen){
      const __domHeader=document.querySelector('#q-app>.q-layout>.q-header');
      const __domDrawer=document.querySelector('#q-app>.q-layout>.q-drawer-container>.q-drawer--left');
      const __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
      if(__domHeader){
        __domHeader.style.left='300px';
      }
      if(__domDrawer){
        __domDrawer.style.transform='unset !important';
        __domDrawer.className=__domDrawer.className.replace('q-layout--prevent-focus ','');
      }
      if(__domPageContainer){
        __domPageContainer.style.paddingLeft='300px';
      }
      if(window.ssr_themedark){
        if(__domDrawer){
          __domDrawer.classList.add('q-drawer--dark','q-dark');
          const __domDrawerList=__domDrawer.querySelector('.q-list');
          if(__domDrawerList) __domDrawerList.classList.add('q-list--dark');
          const __domDrawerSeparators=__domDrawer.querySelectorAll('.q-separator');
          __domDrawerSeparators.forEach(item=>item.classList.add('q-separator--dark'));
        }
      }
    }
  };`;
  }
}
