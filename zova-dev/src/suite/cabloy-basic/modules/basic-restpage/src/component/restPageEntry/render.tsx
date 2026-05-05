import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderRestPageEntry<TData extends {} = {}> extends BeanRenderBase {
  // private _renderForm() {
  //   const ComponentForm = this.$zovaComponent(this.$$modelResource.componentForm);
  //   return (
  //     <ComponentForm<TData>
  //       controllerRef={ref => {
  //         this.controllerForm = ref;
  //       }}
  //       data={this.formData}
  //       schema={this.formSchema}
  //       schemaScene={this.schemaScene}
  //       formMeta={this.formMeta}
  //       formProvider={this.formProvider}
  //       formScope={this.pageEntryScope}
  //       onSubmitData={data => this.submitData(data)}
  //       onShowError={({ error }) => {
  //         // eslint-disable-next-line no-alert
  //         window.alert(error.message);
  //       }}
  //       onChanged={data => {
  //         this.setPageMeta(data, true);
  //       }}
  //     ></ComponentForm>
  //   );
  // }
  // private _renderOperationsRow() {
  //   const celScope = this.pageEntryScope;
  //   const jsxRenderContext = this.getJsxRenderContextPageEntry(celScope);
  //   const actions = this.formSchema?.rest?.dtoActions;
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
  // private _renderToolbar() {
  //   return this._renderOperationsRow();
  // }
  // public render() {
  //   const toolbarPosition = this.$props.toolbarPosition;
  //   const domToolbar = this._renderToolbar();
  //   if (!this.formData) {
  //     return <div>{this.scope.locale.EntryNotExist()}</div>;
  //   }
  //   return (
  //     <div>
  //       {toolbarPosition === 'top' && domToolbar}
  //       {this._renderForm()}
  //       {toolbarPosition === 'bottom' && domToolbar}
  //     </div>
  //   );
  // }
}
