import { BeanBase, cast, UseScope } from 'zova';
import { Service } from 'zova-module-a-bean';
import { ScopeModuleASsr } from 'zova-module-a-ssr';

export const ErrorMessageJwtExpired = 'jwt expired';

@Service()
export class ServiceSsr extends BeanBase {
  @UseScope()
  $$scopeSsr: ScopeModuleASsr;

  public async initialize() {
    // ssr hydrated
    if (process.env.CLIENT) {
      this.ctx.meta.$ssr.onHydrated(() => {
        cast(this.app.vue.config.globalProperties.$q).onSSRHydrated();
      });
    }
    // ssr theme
    if (process.env.SERVER) {
      this.ctx.meta.$ssr.context.onRendered((err?: Error) => {
        if (err) return;
        if (!this.$$scopeSsr.config.cookieTheme) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__prefersColorSchemeDarkJS">
            document.body.classList.remove('body--light','body--dark');
            window.ssr_themedark_data.split(',').forEach(item=>document.body.classList.add(item));
            document.querySelector('#__prefersColorSchemeDarkJS').remove();
          </script>`.replaceAll('\n', '');
        }
        if (this.$$scopeSsr.config.optimization.bodyReadyObserver) {
          this.ctx.meta.$ssr.context._meta.bodyTags += `<script id="__leftDrawerOpenJS">
  window.ssr_body_ready_condition=()=>{
    const __domHeader=document.querySelector('#q-app>.q-layout>.q-header');
    const __domDrawer=document.querySelector('#q-app>.q-layout>.q-drawer-container>.q-drawer--left');
    const __domPageContainer=document.querySelector('#q-app>.q-layout>.q-page-container');
    return __domHeader && __domDrawer && __domPageContainer;
  };
  window.ssr_body_ready_callback=()=>{
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
      __domHeader.style.left='300px';
      __domDrawer.style.transform='unset !important';
      __domDrawer.className=__domDrawer.className.replace('q-layout--prevent-focus ','');
      __domPageContainer.style.paddingLeft='300px';
      if(window.ssr_themedark){
      __domDrawer.classList.add('q-drawer--dark','q-dark');
      const __domDrawerList=__domDrawer.querySelector('.q-list');
      if(__domDrawerList) __domDrawerList.classList.add('q-list--dark');
      const __domDrawerSeparator=__domDrawer.querySelector('.q-separator');
      if(__domDrawerSeparator) __domDrawerSeparator.classList.add('q-separator--dark');
      }
    }
    document.querySelector('#__leftDrawerOpenJS').remove();
  };
</script>`.replaceAll('\n', '');
        }
      });
    }
    // ssr errorHandler
    if (process.env.SERVER) {
      this._ssrErrorHandler();
    }
  }

  private _ssrErrorHandler() {
    if (!process.env.SERVER) return;
    const _eventErrorHandler = this.app.meta.event.on('app:errorHandler', ({ err }, next) => {
      if (err.code === 401) {
        if (err.message === ErrorMessageJwtExpired) {
          try {
            this.app.$gotoPage('/home/base/errorExpired', { returnTo: true });
          } catch (err: any) {
            this.ctx.meta.$ssr.context._meta.renderError = err;
          }
          return undefined;
        }
      }
      return next();
    });
    this.ctx.meta.$ssr.context.onRendered((_err?: Error) => {
      _eventErrorHandler();
    });
  }
}
