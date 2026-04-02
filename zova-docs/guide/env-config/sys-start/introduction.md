# Sys Startup Customization

ZovaJS provides a `Hook/Monkey` mechanism that allows deep customization of the system during system startup

Before explaining the `Hook/Monkey` mechanism, it is necessary to first understand the timing of system startup and shutdown

## 🔥Difference from Application Startup

In the SSR scenario, `application startup` refers to each individual request, while `system startup` is unrelated to requests

## System Startup Timing

There are three timings for system startup:

1. `sysInitialize`: Triggers the hook `sysInitialize`
2. `sysInitialized`: Triggers the hook `sysInitialized`
3. `sysReady`: Triggers the hook `sysReady`

## System Shutdown Timing

There is only one timing for system shutdown:

1. `sysClose`: Triggers the hook `sysClose`

## Module Load Timing

There are two timings for module load:

1. `moduleLoading`: Triggers the hook `moduleLoading`
   - For example, the module a-router responds to this hook and registers the routes provided by the module into the system's routing table
2. `moduleLoaded`: Triggers the hook `moduleLoaded`
3. `configLoaded`: Triggers the hook `configLoaded`

## Hook List

The system provides three scenarios to respond to application startup/shutdown hooks:

1. `Module Main`: Respond to the module's own hooks in the file `{module}/src/mainSys.ts`
2. `Module Monkey`: Respond to app hooks in the file `{module}/src/monkeySys.ts`
3. `Sys Monkey`: Respond to app hooks in the file `{project}/src/front/config/monkeySys.ts`

For different scenarios, corresponding interface definitions are provided for different hooks, thereby standardizing the use of hooks

| Hook           | Module Main Interface | Module Monkey Interface | Sys Monkey Interface  |
| -------------- | --------------------- | ----------------------- | --------------------- |
| moduleLoading  | IModuleMain           | IMonkeyModule           | IMonkeyModule         |
| moduleLoaded   | IModuleMain           | IMonkeyModule           | IMonkeyModule         |
| appInitialize  |                       | IMonkeyAppInitialize    | IMonkeyAppInitialize  |
| appInitialized |                       | IMonkeyAppInitialized   | IMonkeyAppInitialized |
| appReady       |                       | IMonkeyAppReady         | IMonkeyAppReady       |
| appClose       |                       | IMonkeyAppClose         | IMonkeyAppClose       |

## Create Module Main

### 1. Cli command

```bash
$ zova :init:main demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Zova Init/Main`
:::

### Module Main Definition

```typescript
export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {}
}
```

## Create Module Monkey

### 1. Cli command

```bash
$ zova :init:monkey demo-student
```

### 2. Menu command

::: tip
Context Menu - [Module Path]: `Zova Init/Monkey`
:::

### Module Monkey Definition

```typescript
export class Monkey extends BeanSimple implements IMonkeyModule, IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyAppReady, IMonkeyAppClose {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async appInitialize() {}
  async appInitialized() {}
  async appReady() {}
  async appClose() {}
}
```

## Create App Monkey

### 1. Cli command

```bash
$ zova :init:appMonkey
```

### 2. Menu command

::: tip
Context Menu - [Project Path/src]: `Zova Init/Monkey`
:::

### App Monkey Definition

`src/front/config/monkey.ts`

```typescript
export class AppMonkey extends BeanSimple implements IMonkeyModule, IMonkeyAppInitialize, IMonkeyAppInitialized, IMonkeyAppReady, IMonkeyAppClose {
  async moduleLoading(_module: IModule) {}
  async moduleLoaded(_module: IModule) {}
  async appInitialize() {}
  async appInitialized() {}
  async appReady() {}
  async appClose() {}
}
```
