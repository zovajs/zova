import { BeanRenderBase } from 'zova';
import type { ControllerPageApp } from './controller.js';

export interface RenderApp extends ControllerPageApp {}

export class RenderApp extends BeanRenderBase {
  render() {
    return <router-view />;
  }
}
