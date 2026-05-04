import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPage<TData extends {} = {}> extends BeanRenderBase {
  // private _renderFilter() {
  //   if (!this.$props.showFilter) return;
  //   return (
  //     <ZWrapperFilter
  //       formData={this.queryFilterData}
  //       onFilter={data => {
  //         this.onFilter(data);
  //       }}
  //     ></ZWrapperFilter>
  //   );
  // }
  // private _renderOperationsBulk() {
  //   const celScope = this.pageScope;
  //   const jsxRenderContext = this.getJsxRenderContextPage(celScope);
  //   const actions = this.schema?.rest?.dtoActions;
  //   if (!actions || actions.length === 0) return;
  //   const domActions: VNode[] = [];
  //   actions.forEach((action, index) => {
  //     const options = Object.assign({ key: index }, action.options);
  //     const domAction = this.zovaJsx.render(action.render!, options, celScope, jsxRenderContext);
  //     if (!domAction) return;
  //     if (Array.isArray(domAction)) {
  //       domActions.push(...domAction);
  //     } else {
  //       domActions.push(domAction);
  //     }
  //   });
  //   return <div>{domActions}</div>;
  // }
  // private _renderTable() {
  //   // table
  //   const ComponentTable = this.$zovaComponent(this.$$modelResource.componentTable);
  //   return (
  //     <ComponentTable<TData>
  //       controllerRef={ref => {
  //         this.tableRef = ref;
  //       }}
  //       data={this.data}
  //       schema={this.schema}
  //       tableProvider={this.tableProvider}
  //       tableScope={this.pageScope}
  //     ></ComponentTable>
  //   );
  // }
  // private _renderPages() {
  //   if (!this.paged) return;
  //   return (
  //     <div class="join">
  //       <button class="join-item btn btn-disabled">{`${this.scope.locale.PagedTotalItems()}: ${this.paged.total}`}</button>
  //       <button class="join-item btn btn-disabled">{`${this.scope.locale.PagedTotalPages()}: ${this.paged.pageCount}`}</button>
  //       {this.paged.pageNo > 1 && (
  //         <button
  //           class="join-item btn"
  //           onClick={() => {
  //             this.gotoPage(this.paged!.pageNo - 1);
  //           }}
  //         >
  //           «
  //         </button>
  //       )}
  //       {this.paged.pageCount > 0 && <button class="join-item btn">{this.paged.pageNo}</button>}
  //       {this.paged.pageNo < this.paged.pageCount && (
  //         <button
  //           class="join-item btn"
  //           onClick={() => {
  //             this.gotoPage(this.paged!.pageNo + 1);
  //           }}
  //         >
  //           »
  //         </button>
  //       )}
  //     </div>
  //   );
  // }
  // public render() {
  //   return (
  //     <div>
  //       {this._renderFilter()}
  //       {this._renderOperationsBulk()}
  //       {this._renderTable()}
  //       {this._renderPages()}
  //     </div>
  //   );
  // }
}
