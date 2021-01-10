# The Editor

**The Editor**是一个极简`markdown`编辑器。仅提供了几个核心的基础API：`getValue`, `getHTML`, `getTOC`, `setValue`。配置选项也非常精简，能满足大部分的需求场景。

开发**The Editor**的原因只有一个，目前社区上的`markdown`编辑器都不能让我满意。前不久我在开发博客后台管理的时候，陷入了编辑器选择困境，尝试了很多个编辑器都不尽如人意。其中最优秀的一个[Editor.md](https://pandao.github.io/editor.md/)，因为没有模块化、使用麻烦、作者停更几个原因作罢。因此决定自己动手撸一个。

## 特性

* 模块化
* 极简API
* markdown代码高亮
* markdown代码折叠
* 图片上传（粘贴）
* 实时预览
* Table of content（TOC）支持

## 快速开始

### 通过NPM引入

安装

```bash
yarn add the-editor
// or
npm i the-editor
```

使用

```javascript
const editor = new TheEditor(editorElement, options)
// options=可选，具体属性见下文
```

以`vue`为例

```javascript
// main.js
import 'the-editor/dist/the-editor.css'; // 引入样式
```

```vue
// app.vue
<template>
  <div ref="editor">
</template>
<script>
import TheEditor from 'the-editor'

export default {
  mounted() {
    const editor = new TheEditor(this.$refs.editor, {
      value: '# Hello The Editor'
    })
  }
}
</script>
```

### 通过jsdelivr引入

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/the-editor@0.0.5/dist/the-editor.min.css">
<script src="https://cdn.jsdelivr.net/npm/the-editor@0.0.5/dist/the-editor.min.js"></script>
```

## 选项列表

所有选项均为可选

|选项|类型|默认值|描述|
|---|---|---|---|
|value|string|null|markdown文本|
|gfm|boolean|true|GitHub Flavoured Markdown|
|lineNumbers|boolean|true|是否显示行号|
