import type { ControllerLayoutDefaultProps } from '../../component/layoutDefault/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerLayoutDefault } from '../../component/layoutDefault/controller.jsx';
import { RenderLayoutDefault } from '../../component/layoutDefault/render.jsx';
import { StyleLayoutDefault } from '../../component/layoutDefault/style.js';

export const ZLayoutDefault = defineComponent(
  (_props: ControllerLayoutDefaultProps) => {
    useController(ControllerLayoutDefault, RenderLayoutDefault, StyleLayoutDefault);
    return () => {
      return null;
    };
  },
);
