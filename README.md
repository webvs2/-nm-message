# @nanometer/nm

<div align="center">

![Version](https://img.shields.io/badge/version-3.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.3-purple.svg)

**🚀 轻量级、现代化的消息提示库**

</div>

## 📖 简介

`@nanometer/nm` 是一个专为现代前端应用设计的轻量级消息提示库。它体积小巧、性能优异，提供了丰富的消息类型和灵活的配置选项，可以轻松集成到任何前端项目中。

### ✨ 核心特性

- **🎯 极简轻量** - 极小的包体积和内存占用，不影响应用性能
- **🔧 框架无关** - 支持任何前端框架，无需额外依赖
- **🎨 类型丰富** - 内置 4 种消息类型（success、warning、info、error），支持自定义扩展
- **⚡ 现代化构建** - 基于 TypeScript + Vite 构建，支持 ES 模块
- **🎭 灵活配置** - 支持参数模式或直接调用，满足不同使用场景
- **🎪 流畅动画** - 优化的进入/退出动画，提升用户体验
- **🔗 事件支持** - 支持后缀点击等交互
- **📦 智能队列** - 自动管理消息队列，优化布局回收

## 📦 安装

使用 pnpm 安装（推荐）：

```bash
pnpm add @nanometer/nm
```

或使用 npm：

```bash
npm install @nanometer/nm
```

或使用 yarn：

```bash
yarn add @nanometer/nm
```

## 🚀 快速开始

### 基础用法

```javascript
import { Message } from "@nanometer/nm";
import "@nanometer/nm/style.css";

// 创建消息实例
const message = new Message();

// 简单调用
message.show("Hello World!");

// 参数模式
message.show({
  type: "success",
  content: "操作成功！",
  durationTime: 3000,
});
```

### 消息类型示例

```javascript
// 成功消息
message.show({ type: "success", content: "保存成功！" });

// 警告消息
message.show({ type: "warning", content: "请注意操作！" });

// 信息消息
message.show({ type: "info", content: "这是一条提示信息" });

// 错误消息
message.show({ type: "error", content: "操作失败，请重试" });
```

## 📚 API 文档

### 导入方式

```javascript
// 导入 Message 类和 init 函数
import { Message, init } from "@nanometer/nm";
import "@nanometer/nm/style.css";

// 创建消息实例
const message = new Message();
```

### 配置选项

| 参数           | 类型                                          | 默认值          | 描述                                     |
| -------------- | --------------------------------------------- | --------------- | ---------------------------------------- |
| `type`         | `"success" \| "warning" \| "info" \| "error"` | `"info"`        | 消息类型                                 |
| `content`      | `string \| HTMLElement`                       | -               | 消息内容（必填）                         |
| `durationTime` | `number \| boolean`                           | `3000`          | 显示时长（毫秒），`false` 表示不自动关闭 |
| `class`        | `string`                                      | `""`            | 自定义 CSS 类名                          |
| `container`    | `string \| HTMLElement`                       | `document.body` | 消息容器                                 |
| `suffix`       | `string \| HTMLElement`                       | -               | 后缀内容                                 |
| `suffixEvent`  | `(data: {close: () => void}) => any`          | -               | 后缀点击事件                             |

### 返回值

- `message.show(...)` 会返回一个对象：`{ close: () => void }`，用于手动关闭该条消息。

### 高级用法

```javascript
// 全局配置
import { init } from "@nanometer/nm";
init({
  type: "info",
  durationTime: 5000,
});

// 自定义容器
message.show({
  type: "success",
  content: "自定义容器消息",
  container: "#my-container",
});

// 自定义样式
message.show({
  type: "info",
  content: "自定义样式消息",
  class: "my-custom-class",
});

// 带后缀的消息
message.show({
  type: "warning",
  content: "确认删除？",
  suffix: "撤销",
  suffixEvent: ({ close }) => {
    console.log("撤销操作");
    close();
  },
});

// 使用返回的关闭句柄
const { close } = message.show({
  type: "info",
  content: "3 秒后自动关闭，也可手动关闭",
  durationTime: 3000,
});
// 某些场景下，提前手动关闭
// close();

// 不自动关闭的消息
message.show({
  type: "info",
  content: "需要手动关闭的消息",
  durationTime: false,
});
```

## 🎨 样式定制

库提供了默认的样式文件，你可以通过以下方式引入：

```javascript
import "@nanometer/nm/style.css";
```

或者在你的项目中自定义样式：

```scss
:root {
  --na-padding: 6px 10px;
  --na-animation-duration: 0.3s;
  --na-justify-content: center;
  --na-zindex: 100;
}

.na-box {
  // 自定义容器样式
}

.na-con {
  // 自定义消息样式
}

.na-box_success {
  // 自定义成功消息样式
}
```

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建库
pnpm build

# 预览演示
pnpm preview
```

## 📊 性能优化

v3.2.0 更新了以下优化：

- ✅ 修复了消息出现/消失动画时序问题
- ✅ 优化了消息队列回收时机
- ✅ 减小了打包体积，移除了不必要的代码
- ✅ 提升了动画流畅度

## 🕘 历史更新记录

- 2026-03-04：v3.2.0 - 优化打包体积，修复动画和队列回收时机问题，完善 README 文档
- 2025-09-03：移除了 `beforeEvent` 和 `postEvent` 方法。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

- 📝 [提交 Issue](https://github.com/webvs2/-nm-message/issues)
- 🔗 [GitHub 仓库](https://github.com/webvs2/-nm-message)

---

<div align="center">

**如果这个项目对你有帮助，请给个 ⭐️ 支持一下！**

</div>
