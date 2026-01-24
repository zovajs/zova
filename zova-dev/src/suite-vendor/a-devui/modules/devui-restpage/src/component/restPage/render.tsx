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
          this._onFilter(data);
        }}
      ></ZWrapperFilter>
    );
  }

  private _renderCreate() {
    if (!this.permissions?.table?.create) return;
    return (
      <button
        class="btn btn-primary"
        type="button"
        onClick={() => {
          // this.onActionTable('create');
        }}
      >
        {this.scope.locale.Create()}
      </button>
    );
  }

  private _renderTable() {
    // table
    const ComponentTable = this.$zovaComponent(this.$$modelResource.componentTable);
    return (
      <ComponentTable<TData>
        data={this.data}
        schema={this.schema}
        tableProvider={this.$$restPage.tableProvider}
        tableScope={this.$$restPage.tableScope}
        getColumns={(next, $$table) => {
          return this.getColumns(next, $$table);
        }}
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
        {this._renderCreate()}
        {this._renderTable()}
        {this._renderPages()}
      </div>
    );
  }
}
