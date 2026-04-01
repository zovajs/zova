# Multi-dimensional Variables

Zova uses multi-dimensional variables to load environment variables and Config configurations, providing a more flexible configuration mechanism and supporting more complex business scenarios

The `multi-dimensional variables` in Zova contain three dimensions: `Runtime Environment`, `App Mode` and `Flavor`

## Runtime Environment

Zova provides two runtime environments:

| Name        | Description             |
| ----------- | ----------------------- |
| development | Development environment |
| production  | Production environment  |

### 1. Enabling the Runtime Environment

Enabling the corresponding runtime environment by executing different commands

```bash
# development
$ npm run dev
# production
$ npm run build
$ npm run preview
```

### 2. How to Determine the Current Runtime Environment

- Determining with `Env`

Using Env to determine the current runtime environment supports `tree-shaking` during builds

```typescript
process.env.META_MODE === 'development';
process.env.META_MODE === 'production';
```

- Simplified Notation

```typescript
process.env.DEV; // boolean
process.env.PROD; // boolean
```

- Determined by `Config`

```typescript
sys.config.meta.mode === 'development';
sys.config.meta.mode === 'production';
```

## Flavor

For more complex business scenarios, we often need to provide configuration capabilities for more scenarios. Zova specifically provides a `Flavor` mechanism. The combination of `runtime environments` and `flavors` allows us to conveniently define configuration information for various scenarios

### 1. Built-in Flavors

For out-of-the-box, Zova provides several built-in flavors:

| Name   | Description                                        |
| ------ | -------------------------------------------------- |
| normal | The default flavor                                 |
| play   | For use in [Playground](../../start/play.md)       |
| docker | For use in Docker environments                     |
| ci     | For use in CI environments, such as GitHub Actions |

### 2. Enabling a Flavor

Enabling the corresponding flavor by passing the command parameter: `--flavor`

```bash
# normal
$ npm run dev
# docker
$ npm run dev -- --flavor=docker
$ npm run build -- --flavor=docker
# ci
$ npm run build -- --flavor=ci
```

### 3. How to Determine the Current Flavor

- Determining via `Env`

Using Env to determine the current flavor supports tree-shaking during builds

```typescript
process.env.META_FLAVOR === 'normal';
process.env.META_FLAVOR === 'docker';
process.env.META_FLAVOR === 'ci';
```

- Determine via `Config`

```typescript
app.config.meta.flavor === 'normal';
app.config.meta.flavor === 'docker';
app.config.meta.flavor === 'ci';
```

### 4. Creating a Flavor

You can create a flavor based on any business need, such as customer, project, organization, etc.

For example, let's assign a flavor named `customA` to customer A, providing a separate env/config configuration for customer A

- Enabling the Flavor

```bash
$ npm run dev -- --flavor=customA
```

- How to determine the flavor

```typescript
process.env.META_FLAVOR === 'customA';
app.config.meta.flavor === 'customA';
```

### 5. Add Flavor Type Definition

You can add a Flavor type definition to provide type hints

In the VSCode editor, enter the code snippet `recordflavor` to automatically generate a code skeleton, and then add a custom Flavor type definition

```diff
declare module '@cabloy/module-info' {
  export interface VonaMetaFlavorExtend {
+   customA: never;
  }
}
```
