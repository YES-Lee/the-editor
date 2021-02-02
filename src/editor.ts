import Codemirror, { ScrollInfo } from 'codemirror';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import marked from 'marked';
import hljs from 'highlight.js'

import { Plugin } from './interfaces';
import { Toolbar, Previewer } from './plugins'
import type { Options, TOC } from './types';
import { Dialog, DialogConfig } from './dialog';
import './styles/index.scss';

/**
 * TheEditor构造函数
 */
export class TheEditor {
  static builtInPlugins: Record<string, Function> = {
    Previewer,
    Toolbar
  }
  /**
   * 编辑器默认配置
   */
  static defaultOptions: Options = {
    lineNumbers: true,
    tabSize: 2,
    gfm: true,
    plugins: [new Previewer(), new Toolbar()],
    toolbar: {
      visible: true,
      items: [
        'undo', 'redo',
        '|',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        '|',
        'bold', 'strikethrough', 'italic', 'quote',
        '|',
        'ul', 'ol', 'line',
        '|',
        'link', 'inline-code', 'code-block', 'table', 'image', 'datetime',
        '|',
        'preview',
      ]
    }
  }
  private eventListeners: { [key: string]: any } = {};
  private toc: TOC = [];
  private html: string = '';
  private dialog?: Dialog;
  /**
   * 插件实例
   */
  plugins: Map<string, Plugin> = new Map();
  /**
   * codemirror实例
   */
  $codemirror: Codemirror.Editor;
  /**
   * TheEditor选项
   */
  options: Options;
  /**
   * 编辑器根节点
   */
  host: HTMLElement;
  /**
   * The Editor构造函数
   * @param host 宿主元素
   * @param options 选项
   */
  constructor(host: HTMLElement, options?: Options) {
    this.host = host;
    host.classList.add('the_editor')
    this.options = { ...TheEditor.defaultOptions, ...options }

    const renderer = new marked.Renderer()
    const that = this;
    renderer.heading = function(text, level, raw) {
      const anchor = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
      that.toc.push({
        anchor,
        level,
        text
      })
      return `<h${level} id="${anchor}">${text}</h${level}>`
    }

    marked.setOptions({
      renderer,
      gfm: this.options.gfm,
      highlight: (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
      },
      pedantic: false,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    })

    this.$codemirror = Codemirror(host, {
      mode: this.options.gfm ? 'gfm' : 'markdown',
      lineNumbers: this.options?.lineNumbers,
      tabSize: this.options?.tabSize,
      indentWithTabs: true,
      lineWrapping: true,
      foldGutter: this.options?.lineNumbers,
      gutters: this.options?.lineNumbers ? ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'] : [],
      value: this.options?.value || ''
    });
    this.updateHTML();

    this.installPlugins();

    this.initPaseImage();

    this.emit('change', this.$codemirror.getValue())

    this.$codemirror.on('change', (editor) => {
      this.updateHTML();
      this.emit('change', editor.getValue())
    })

    this.$codemirror.on('scroll', (editor) => {
      this.emit('scroll', editor.getScrollInfo());
    })
  }

  on(event: 'change', handler: (value: string) => void): void;
  on(event: 'scroll', handler: (scrollInfo: ScrollInfo) => void): void;
  /**
   * 设置事件监听
   * @param event 事件名称
   * @param handler 处理函数
   */
  on(event: string, handler: any): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = []
    }
    if (this.eventListeners[event].indexOf(handler) === -1) {
      this.eventListeners[event].push(handler)
    }
  }

  /**
   * 取消监听事件
   * @param event 事件名称
   * @param handler 处理函数
   */
  off(event: string, handler: any): void {
    const listeners = this.eventListeners[event]
    if (listeners && listeners.length) {
      const idx = listeners.indexOf(handler)
      if (idx !== -1) {
        listeners.splice(idx, 1)
      }
    }
  }

  emit(event: 'change', value: string): void;
  emit(event: 'scroll', scrollInfo: ScrollInfo): void;
  /**
   * 发布事件
   * @param event 事件名称
   * @param value 事件数据
   */
  emit(event: string, value: any): void {
    const listeners = this.eventListeners[event] || []
    listeners.forEach((fn: (value: any) => void) => {
      fn(value)
    })
  }

  /**
   * 按比例滚动
   * @param percent 滚动比例
   */
  scrollToPercent(percent: number): void {
    const scrollInfo = this.$codemirror.getScrollInfo()
    this.$codemirror.scrollTo(0, percent * (scrollInfo.height - scrollInfo.clientHeight))
  }

  /**
   * 显示对话框
   * @param config 对话框配置
   */
  openDialog(config: DialogConfig): void {
    this.dialog = new Dialog(config);
  }

  /**
   * 关闭对话框
   */
  closeDialog(): void {
    this.dialog?.close();
    this.$codemirror.focus();
  }

  /**
   * 设置markdown内容
   * @param markdown markdown文本
   */
  setValue(markdown: string): void {
    this.$codemirror.setValue(markdown);
  }

  /**
   * 获取markdown内容
   */
  getValue(): string {
    return this.$codemirror.getValue();
  }

  /**
   * 获取html文本
   */
  getHTML(): string {
    return this.html;
  }

  /**
   * 获取TOC
   */
  getTOC(): TOC {
    return this.toc;
  }

  /**
   * 更新HTML和TOC
   */
  private updateHTML(): void {
    this.toc = [];
    this.html = marked(this.$codemirror.getValue())
  }

  /**
   * 粘贴图片自动上传
   */
  private initPaseImage(): void {
    this.$codemirror.on('paste', (editor, event) => {
      if (!event.clipboardData) {
        return
      }
      const types = event.clipboardData.types
      if (types.length > 1 || !types.includes('Files')) {
        // 粘贴内容中包含文件以外的其他类型数据，则不处理图片
        return
      }
      const images = Array.from(event.clipboardData.files).filter(f => /image\/.*/gi.test(f.type))
      if (!images.length) {
        return
      }
      if (!this.options.imageUploadAdaptor) {
        console.warn('[The Editor] 请在选项中提供imageUploadAdaptor')
        return
      }
      event.preventDefault()
      editor.execCommand('newlineAndIndent')
      editor.replaceSelection('![正在上传...](...)')
      const res = this.options.imageUploadAdaptor.upload(images)
      const appendImages = (urls: string[]) => {
        const str = urls.map(u => `![](${u})`).join('\n')
        editor.execCommand('undo')
        editor.replaceSelection(str)
      }
      if (res instanceof Promise) {
        res.then(appendImages)
      } else {
        appendImages(res)
      }
    })
  }

  /**
   * 安装插件
   * @param PluginFn 插件
   */
  private installPlugins() {
    const plugins = this.options.plugins || []
    plugins.forEach(plugin => {
      try {
        if (!this.plugins.has(plugin.name)) {
          this.plugins.set(plugin.name, plugin)
          plugin.install(this, this.options[plugin.name.toLowerCase()] || {})
        }
      } catch (err) {
        console.error(err)
      }
    })
  }
}
