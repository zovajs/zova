export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';

export interface IInputOptions {
  class?: any;
  value?: any;
  type?: HTMLInputElementType;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (e: Event) => void;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}
