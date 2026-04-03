# Bean Scene

Zova 提供了一组装饰器函数，用于声明 Bean Class 是可注入的。不同的装饰器函数代表不同的使用场景，同时也约定了默认的注入范围

- a-bean

| 名称        | 说明                             | scene      | 默认注入范围 |
| ----------- | -------------------------------- | ---------- | ------------ |
| @Sys        | Sys Bean                         | sys        | sys          |
| @Aop        | Aop Bean                         | aop        | sys          |
| @AopMethod  | AopMethod Bean                   | aopMethod  | sys          |
| @Store      | [Vue: Pinia](../../vue/pinia.md) | store      | app          |
| @Tool       | Tool Bean                        | tool       | app          |
| @Controller | Controller Bean                  | controller | ctx          |
| @Render     | Render Bean                      | render     | ctx          |
| @Style      | Style Bean                       | style      | ctx          |
| @Service    | Service for Component/Page       | service    | ctx          |
| @Bean       | General Service                  | bean       | ctx          |
| @Data       | Data Bean                        | data       | new          |

| @Style | [全局样式](../../techniques/css-in-js/class.md) | style | app |
| @Theme | [Theme](../../techniques/css-in-js/theme.md) | theme | app |
| @Model | [Model: 统一数据源](../../techniques/model/introduction.md) | model | ctx |

- a-action

| 名称    | 说明        | scene  | 默认注入范围 |
| ------- | ----------- | ------ | ------------ |
| @Action | Action Bean | action | sys          |

- a-api

| 名称       | 说明           | scene     | 默认注入范围 |
| ---------- | -------------- | --------- | ------------ |
| @Api       | Api Bean       | api       | app          |
| @ApiMeta   | ApiMeta Bean   | apiMeta   | app          |
| @ApiSchema | ApiSchema Bean | apiSchema | app          |

- a-behavior

| 名称      | 说明          | scene    | 默认注入范围 |
| --------- | ------------- | -------- | ------------ |
| @Behavior | Behavior Bean | behavior | new          |

- a-fetch

| 名称         | 说明             | scene       | 默认注入范围 |
| ------------ | ---------------- | ----------- | ------------ |
| @Interceptor | Interceptor Bean | interceptor | new          |

- a-meta

| 名称  | 说明      | scene | 默认注入范围 |
| ----- | --------- | ----- | ------------ |
| @Meta | Meta Bean | meta  | app          |
