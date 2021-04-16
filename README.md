# umi hub

The Umi Hub is a standalone application that streamlines the way you find, download, and manage your Umi Projects and installations. In addition, you can manually add versions of the Editor that you have already installed on your machine to your Hub.

## 使用

### 安装依赖。

```bash
# 安装依赖
$ yarn
```

### 启动本地调试。

```bash
$ yarn dev
```

你也可以分开运行 `npm run dev:renderer` 和 `npm run dev:main`。

打开 electron 开发

```bash
$ yarn start
```

### 热加载

文件编译是自动热加载的， electron 无法实现热加载，但是你可以在执行 `yarn start` 的窗口输入 `rs` 来重启服务。

### 打包。

```bash
$ yarn build // 先执行build，同样你可以分开运行。
```

再生成 electron 安装包

```bash
$ yarn make
```

## 截图

<img src="https://gw.alipayobjects.com/zos/rmsportal/EHDQdNKjUrVxTGfBTMVv.png" width="600" />

## 目录结构

采用与 alita 通用的目录结构，将 electron 当作一种平台，与 ios 和 android 共同放在 platforms 目录下。
