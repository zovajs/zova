import { CellContext } from '@tanstack/table-core';
import { VNode } from 'vue';
import { BeanBase } from 'zova';
import { IDecoratorTableFeatureOptions, TableFeature } from 'zova-module-a-table';

export interface ITableFeatureOptionsSchema extends IDecoratorTableFeatureOptions {}

@TableFeature<ITableFeatureOptionsSchema>()
export class TableFeatureSchema extends BeanBase {}
