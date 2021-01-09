import Codemirror, { ScrollInfo } from 'codemirror';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import { Previewer } from './previewer'
import { Toolbar } from './toolbar'

import marked from 'marked';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import './styles/index.scss';

export type Options = {
  gfm?: boolean;
  value?: string;
  lineNumbers?: boolean;
  tabSize?: number;
  imageUploadAdaptor?: ImageUploadAdaptor;
}

export type TOC = Array<{
  id: string;
  title: string;
  parent: string;
  level: number;
}>;

export interface ImageUploadAdaptor {
  upload(images: File[]): string[] | Promise<string[]>;
}

export class TheEditor {
  static defaultOptions: Options = {
    lineNumbers: true,
    tabSize: 2,
    gfm: true
  }
  private eventListeners: { [key: string]: any } = {};
  private codemirrorEditor: Codemirror.Editor;
  options: Options;
  host: HTMLElement;
  toolbar?: Toolbar;
  previewer?: Previewer;
  /**
   * The Editor构造函数
   * @param host 宿主元素
   * @param options 选项
   */
  constructor(host: HTMLElement, options?: Options) {
    this.host = host;
    host.classList.add('the_editor')
    this.options = { ...TheEditor.defaultOptions, ...options }

    this.codemirrorEditor = Codemirror(host, {
      mode: this.options.gfm ? 'gfm' : 'markdown',
      lineNumbers: this.options?.lineNumbers,
      tabSize: this.options?.tabSize,
      indentWithTabs: true,
      lineWrapping: true,
      foldGutter: this.options?.lineNumbers,
      gutters: this.options?.lineNumbers ? ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'] : [],
      value: this.options?.value || ''
    });

    // this.toolbar = new Toolbar(this);
    this.previewer = new Previewer(this)

    this.emit('change', this.codemirrorEditor.getValue())

    this.codemirrorEditor.on('change', (editor) => {
      this.emit('change', editor.getValue())
    })

    this.codemirrorEditor.on('scroll', (editor) => {
      this.emit('scroll', editor.getScrollInfo());
    })

    this.codemirrorEditor.on('paste', (editor, event) => {
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
      const startCursor = editor.getCursor()
      editor.replaceSelection('![正在上传...](...)')
      const endCursor = editor.getCursor()
      const res = this.options.imageUploadAdaptor.upload(images)
      const appendImages = (urls: string[]) => {
        const str = urls.map(u => `![](${u})`).join('\n')
        editor.replaceRange(str, startCursor, endCursor)
      }
      if (res instanceof Promise) {
        res.then(appendImages)
      } else {
        appendImages(res)
      }
    })
  }

  on(event: 'change', handler: (value: string) => void): void;
  on(event: 'scroll', handler: (scrollInfo: ScrollInfo) => void): void;
  on(event: string, handler: any): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = []
    }
    if (this.eventListeners[event].indexOf(handler) === -1) {
      this.eventListeners[event].push(handler)
    }
  }

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
  emit(event: string, value: any): void {
    const listeners = this.eventListeners[event] || []
    listeners.forEach((fn: (value: any) => void) => {
      fn(value)
    })
  }

  scrollToPercent(percent: number): void {
    const scrollInfo = this.codemirrorEditor.getScrollInfo()
    this.codemirrorEditor.scrollTo(0, percent * (scrollInfo.height - scrollInfo.clientHeight))
  }

  /**
   * 设置markdown内容
   * @param markdown markdown文本
   */
  setValue(markdown: string): void {
    this.codemirrorEditor.setValue(markdown);
  }

  /**
   * 获取markdown内容
   */
  getValue(): string {
    return this.codemirrorEditor.getValue();
  }

  /**
   * 获取html文本
   */
  getHTML(): string {
    return marked(this.codemirrorEditor.getValue());
  }

  /**
   * 获取TOC
   */
  getTOC(): TOC {
    // TODO
    return [];
  }
}
