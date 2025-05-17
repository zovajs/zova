import type { ComponentPublicInstance } from 'vue';
import type { Constructable, IComponentRecord } from 'zova';
import type { TypeBehaviorRecordSelectorKeysStrict } from 'zova-module-a-behavior';

export interface IFormProviderBehaviors {
  formField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  formFieldLayout?: TypeBehaviorRecordSelectorKeysStrict<'formFieldLayout'>;
  formFieldModel?: TypeBehaviorRecordSelectorKeysStrict<'formFieldModel'>;
}

export interface IFormProviderComponents {
  // table?: TypeComponentRecordSelectorKeysStrict<'restTable'>;
  text?: TypeFormProviderComponent;
}

export interface IFormProvider {
  components?: IFormProviderComponents;
  behaviors?: IFormProviderBehaviors;
}

export type TypeFormProviderComponent = Constructable<ComponentPublicInstance> | (keyof IComponentRecord) | string;
