import defaultList from './command/default.list.js';
import createProject from './command/create.project.js';
import createComponent from './command/create.component.js';
import createBean from './command/create.bean.js';
import createStore from './command/create.store.js';
import createModel from './command/create.model.js';
import createStyle from './command/create.style.js';
import createTheme from './command/create.theme.js';
import createTool from './command/create.tool.js';
import createLocal from './command/create.local.js';
import createService from './command/create.service.js';
import createMock from './command/create.mock.js';
import createModule from './command/create.module.js';
import createPage from './command/create.page.js';
import createSuite from './command/create.suite.js';
import initIcon from './command/init.icon.js';
import initConfig from './command/init.config.js';
import initConstant from './command/init.constant.js';
import initLocale from './command/init.locale.js';
import initError from './command/init.error.js';
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
    bean: createBean,
    store: createStore,
    model: createModel,
    style: createStyle,
    theme: createTheme,
    tool: createTool,
    local: createLocal,
    service: createService,
    mock: createMock,
  },
  init: {
    icon: initIcon,
    config: initConfig,
    constant: initConstant,
    locale: initLocale,
    error: initError,
  },
  tools: {
    // icon: toolsIcon,
    metadata: toolsMetadata,
  },
};
