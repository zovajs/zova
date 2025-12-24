import { VNode } from 'vue';
import { disposeInstance, Use } from 'zova';
import { BeanBehaviorBase, Behavior, IBehaviors, IDecoratorBehaviorOptions, NextBehavior, ServiceComposer } from 'zova-module-a-behavior';
import { ControllerForm } from '../component/form/controller.jsx';
import { IFormFieldOptions } from '../types/formField.js';

export interface IBehaviorPropsInputFormField {}

export interface IBehaviorPropsOutputFormField {}

export interface IBehaviorOptionsFormField<TParentData = unknown>
  extends IDecoratorBehaviorOptions, IFormFieldOptions<TParentData> {
}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<
  IBehaviorOptionsFormField,
  IBehaviorPropsInputFormField,
  IBehaviorPropsOutputFormField
> {
  private _composer?: ServiceComposer;

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected async __init__(options: IBehaviorOptionsFormField) {
    // behaviors
    const behaviors = this._prepareBehaviors(options);
    if (behaviors) {
      this._composer = await this.createComposer(behaviors);
    }
  }

  protected __dispose__() {
    this._disposeComposer();
  }

  protected async onOptionsChange(options: IBehaviorOptionsFormField) {
    super.onOptionsChange(options);
    // behaviors
    const behaviors = this._prepareBehaviors(options);
    if (behaviors) {
      if (!this._composer) {
        this._composer = await this.createComposer(behaviors);
      } else {
        await this._composer.load(behaviors);
      }
    } else {
      this._disposeComposer();
    }
  }

  protected render(props: IBehaviorPropsInputFormField, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    if (!this._composer) return next();
    return this._composer.render(props, next);
  }

  private _disposeComposer() {
    if (this._composer) {
      disposeInstance(this._composer);
      this._composer = undefined;
    }
  }

  private _prepareBehaviors(options: IBehaviorOptionsFormField): IBehaviors | undefined {
    if (options.behaviorModel === false) return undefined;
    if (!options.behaviorModel || options.behaviorModel === true) return this.$$form.formProvider.behaviors?.formFieldModel;
    return options.behaviorModel;
  }
}
