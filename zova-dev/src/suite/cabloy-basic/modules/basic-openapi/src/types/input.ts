export type HTMLInputElementType = 'text' | 'password' | 'number' | 'file' | 'hidden' | 'tel' | 'email';

export interface IInputOptions {
  placeholder?: string;
  type?: HTMLInputElementType;
}
