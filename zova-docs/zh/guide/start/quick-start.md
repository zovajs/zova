# 快速上手

## 准备工作

1. 安装命令行工具

```bash
$ pnpm add -g zova-cli@latest
```

2. 安装 Vscode 插件：[Zova - Official](https://marketplace.visualstudio.com/items?itemName=cabloy.zova-vscode)

该插件提供了大量菜单，用于快速创建各类资源的代码骨架

## 快速开始

### 1. 创建项目

```bash
$ zova :create:project projectName
```

1. 直接在命令行执行`zova`创建一个项目，名称为`projectName`
2. 命令行会列出模版列表，当前提供的模版如下：
   - zova + quasar
   - zova + vuetify
   - zova only

### 2. 启动开发服务

```bash
$ npm run dev
```

### 3. 构建项目

```bash
$ npm run build
```

### 4. 预览

```bash
$ npm run preview
```
