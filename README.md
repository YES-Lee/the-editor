# The Editor

**The Editor**是一个极简`markdown`编辑器。仅提供了几个核心的基础API：`getValue`, `getHTML`, `getTOC`, `setValue`。配置选项也非常精简，能满足大部分的需求场景。

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

## 实例方法

|方法|参数|返回值|描述|
|---|---|---|---|
|setValue|string|void|设置markdown文本|
|getValue||string|获取markdown文本|
|getHTML||string|获取HTML文本|
|getTOC||Array<{ anchor: string; text: string; level: number; }>|获取TOC|
