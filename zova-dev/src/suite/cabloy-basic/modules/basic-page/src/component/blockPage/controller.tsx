import { celEnvBase } from '@cabloy/utils';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import { BeanControllerBase, deepEqual, IComponentOptions, useCustomRef } from 'zova';
import { ZovaJsx } from 'zova-jsx';
import { Controller } from 'zova-module-a-bean';
import { $QueriesAutoLoad } from 'zova-module-a-model';
import { IJsxRenderContextPage, IPageScope, ITablePaged, ITableQuery, ITableResPaged } from 'zova-module-a-openapi';
import { BeanControllerTableBase, ITableProvider } from 'zova-module-a-table';
import { IResourceBlockOptionsPage } from 'zova-module-basic-openapi';
import { ModelResource } from 'zova-module-rest-resource';

export interface ControllerBlockPageProps extends IResourceBlockOptionsPage {}

@Controller()
export class ControllerBlockPage<TData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  tableInstance: BeanControllerTableBase;

  tableProvider: ITableProvider;

  jsxZova: ZovaJsx;
  jsxCelScope: IPageScope;
  jsxRenderContext: IJsxRenderContextPage<TData>;

  queryFilterData: {};
  queryPaged: ITablePaged;
  query: ITableQuery;

  $$modelResource: ModelResource<TData>;

  protected async __init__() {
    this.$$modelResource = await this.bean._getBeanSelector('rest-resource.model.resource', true, this.resource);
    this.tableProvider = this.$useComputed(() => {
      return this.$$modelResource.tableProvider;
    });
    // jsx
    this._prepareJsx();
    // query
    this.queryFilterData = {};
    this.queryPaged = { pageNo: 1 };
    this.query = this.$useComputed(() => {
      return Object.assign({}, this.queryFilterData, this.queryPaged);
    });
    // load schema/data
    await $QueriesAutoLoad(
      () => this.$$modelResource.apiSchemasSelect.sdk,
      () => this.queryData,
    );
    // watch
    this.$watch(
      () => this.permissions,
      async (newValue, oldValue) => {
        if (deepEqual(newValue, oldValue)) return;
        await this.tableInstance?.refreshMeta();
      },
    );
  }

  get resource() {
    return this.$props.resource;
  }

  get queryData() {
    return this.$$modelResource.select(this.query);
  }

  get data() {
    return this.queryData.data?.list;
  }

  get paged(): ITableResPaged | undefined {
    return this.queryData.data;
  }

  get schema() {
    return this.$$modelResource.schemaRow;
  }

  get permissions() {
    return this.$$modelResource.permissions;
  }

  gotoPage(pageNo: number) {
    if (this.queryPaged.pageNo !== pageNo) {
      this.queryPaged.pageNo = pageNo;
    }
  }

  onFilter(data: any) {
    this.queryFilterData = data;
  }

  private _prepareJsx() {
    const jsxCelEnv = celEnvBase.clone();
    this.jsxZova = this.app.bean._newBeanSimple(ZovaJsx, false, this.tableProvider.components, this.tableProvider.actions, jsxCelEnv);
    this.jsxCelScope = this._prepareJsxCelScope();
    this.jsxRenderContext = {
      app: this.app,
      ctx: this.ctx,
      $scene: 'page',
      $host: this,
      $celScope: this.jsxCelScope,
      $jsx: this.jsxZova,
      $$page: this,
    };
  }

  private _prepareJsxCelScope(): IPageScope {
    // eslint-disable-next-line
    const self = this;
    const permissions = useCustomRef(() => {
      return {
        get() {
          return self.$$modelResource.permissions;
        },
        set(_value) {},
      };
    }) as any;
    return {
      resource: this.resource,
      permissions,
    };
  }

  protected render() {
    return <div class={classes(this.$props.class, this.$style(this.$props.style))}>{this._renderBlocks()}</div>;
  }

  private _renderBlocks() {
    const blocks = this.$props.blocks;
    if (!blocks || blocks.length === 0) return;
    let domBlocks: VNode[] = [];
    blocks.forEach((block, index) => {
      const options = Object.assign({ key: index }, block.options);
      const domBlock = this.jsxZova.render(block.render!, options, this.jsxCelScope, this.jsxRenderContext);
      if (!domBlock) return;
      if (Array.isArray(domBlock)) {
        domBlocks.push(...domBlock);
      } else {
        domBlocks.push(domBlock);
      }
    });
    return domBlocks;
  }
}
