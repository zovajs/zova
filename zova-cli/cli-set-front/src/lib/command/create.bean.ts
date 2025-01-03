export default {
  bean: 'create.bean',
  info: {
    version: '5.0.0',
    title: 'Cli: Create Bean',
    usage: 'zova :create:bean sceneName beanName [--module=]',
  },
  options: {
    module: {
      description: 'module name',
      type: 'string',
    },
  },
  groups: {
    default: {
      questions: {
        sceneName: {
          type: 'input',
          message: 'sceneName',
          initial: {
            expression: 'context.argv._[0]',
          },
          required: true,
        },
        beanName: {
          type: 'input',
          message: 'beanName',
          initial: {
            expression: 'context.argv._[1]',
          },
          required: true,
        },
        module: {
          type: 'input',
          message: 'module name',
          required: true,
        },
      },
    },
  },
};
