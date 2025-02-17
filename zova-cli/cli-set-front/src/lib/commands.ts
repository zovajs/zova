import createBean from './command/create.bean.js';
import createComponent from './command/create.component.js';
import createMock from './command/create.mock.js';
import createModule from './command/create.module.js';
import createPage from './command/create.page.js';
import createProject from './command/create.project.js';
import createSuite from './command/create.suite.js';
import defaultList from './command/default.list.js';
import initConfig from './command/init.config.js';
import initConstant from './command/init.constant.js';
import initError from './command/init.error.js';
import initIcon from './command/init.icon.js';
import initLegacy from './command/init.legacy.js';
import initLocale from './command/init.locale.js';
import initMain from './command/init.main.js';
import initMonkey from './command/init.monkey.js';
import openapiConfig from './command/openapi.config.js';
import openapiGenerate from './command/openapi.generate.js';
import refactorAnotherRender from './command/refactor.anotherRender.js';
import refactorAnotherStyle from './command/refactor.anotherStyle.js';
import refactorComponentEmits from './command/refactor.componentEmits.js';
import refactorComponentGeneric from './command/refactor.componentGeneric.js';
import refactorComponentModel from './command/refactor.componentModel.js';
import refactorComponentProps from './command/refactor.componentProps.js';
import refactorComponentSlots from './command/refactor.componentSlots.js';
import refactorFirstRender from './command/refactor.firstRender.js';
import refactorFirstStyle from './command/refactor.firstStyle.js';
import refactorPageParams from './command/refactor.pageParams.js';
import refactorPageQuery from './command/refactor.pageQuery.js';
import refactorRenameComponent from './command/refactor.renameComponent.js';
import toolsDeps from './command/tools.deps.js';
// import toolsIcon from './command/tools.icon.js';
import toolsMetadata from './command/tools.metadata.js';

export const commands = {
  default: {
    list: defaultList,
  },
  create: {
    project: createProject,
    suite: createSuite,
    module: createModule,
    page: createPage,
    component: createComponent,
    mock: createMock,
    bean: createBean,
  },
  init: {
    icon: initIcon,
    config: initConfig,
    constant: initConstant,
    locale: initLocale,
    error: initError,
    legacy: initLegacy,
    monkey: initMonkey,
    main: initMain,
  },
  refactor: {
    pageQuery: refactorPageQuery,
    pageParams: refactorPageParams,
    componentGeneric: refactorComponentGeneric,
    firstRender: refactorFirstRender,
    firstStyle: refactorFirstStyle,
    anotherRender: refactorAnotherRender,
    anotherStyle: refactorAnotherStyle,
    componentProps: refactorComponentProps,
    componentEmits: refactorComponentEmits,
    componentSlots: refactorComponentSlots,
    componentModel: refactorComponentModel,
    renameComponent: refactorRenameComponent,
  },
  tools: {
    // icon: toolsIcon,
    metadata: toolsMetadata,
    deps: toolsDeps,
  },
  openapi: {
    config: openapiConfig,
    generate: openapiGenerate,
  },
};
