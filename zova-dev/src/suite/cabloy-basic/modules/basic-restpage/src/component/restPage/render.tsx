import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

import { ZWrapperFilter } from '../../.metadata/component/wrapperFilter.js';

@Render()
export class RenderRestPage<TData extends {} = {}> extends BeanRenderBase {
  private _renderFilter() {
    if (!this.$props.showFilter) return;
    return (
      <ZWrapperFilter
        formData={this.queryFilterData}
        onFilter={data => {
          this.onFilter(data);
        }}
      ></ZWrapperFilter>
    );
  }

  private _renderOperationsBulk() {
    const render = this.tableProvider.components!.actionOperationsBulk!;
    const celScope = this.pageScope;
    const jsxRenderContext = this.getJsxRenderContextPage(celScope);
    return this.zovaJsx.render(render, this.schema?.rest, celScope, jsxRenderContext);
  }

  private _renderTable() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$modelResource.componentTable);
    return (
      <ComponentTable<TData>
        controllerRef={ref => {
          this.tableRef = ref;
        }}
        data={this.data}
        schema={this.schema}
        tableProvider={this.tableProvider}
        tableScope={this.pageScope}
      ></ComponentTable>
    );
  }

  private _renderPages() {
    if (!this.paged) return;
    return (
      <div class="join">
        <button class="join-item btn btn-disabled">{`${this.scope.locale.PagedTotalItems()}: ${this.paged.total}`}</button>
        <button class="join-item btn btn-disabled">{`${this.scope.locale.PagedTotalPages()}: ${this.paged.pageCount}`}</button>
        {this.paged.pageNo > 1 && (
          <button
            class="join-item btn"
            onClick={() => {
              this.gotoPage(this.paged!.pageNo - 1);
            }}
          >
            «
          </button>
        )}
        {this.paged.pageCount > 0 && <button class="join-item btn">{this.paged.pageNo}</button>}
        {this.paged.pageNo < this.paged.pageCount && (
          <button
            class="join-item btn"
            onClick={() => {
              this.gotoPage(this.paged!.pageNo + 1);
            }}
          >
            »
          </button>
        )}
      </div>
    );
  }

  public render() {
    return (
      <div>
        {this._renderFilter()}
        {this._renderOperationsBulk()}
        {this._renderTable()}
        {this._renderPages()}
      </div>
    );
  }
}
