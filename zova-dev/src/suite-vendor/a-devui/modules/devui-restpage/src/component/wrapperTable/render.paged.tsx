import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderPaged extends BeanRenderBase {
  public render() {
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
        <button class="join-item btn">{this.paged.pageNo}</button>
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
}
