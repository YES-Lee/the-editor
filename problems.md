# 遇到的问题

## 打包后声明文件（.d.ts）缺失

**描述：**

打包后声明文件（.d.ts）只会生成逻辑中用到的以及index中导出的。其他的包括interface都不会产生声明文件

**解决：**

其原因是在tsconfig.json中配置了`includes: ["src/index.ts"]`，将其改成`includes: ["src"]`即可。

## sass打包不会引入node_module中的资源

**描述：**

sass样式打包后，从node_modules引入的资源如`@import '~xxxx.css'`等，在打包后的css中依然是`@import '~xxxx.css'`，没有将代码打包进来。

**解决：**

引用的时候不要带后缀即可，如：`@import 'xxx'`即可。
