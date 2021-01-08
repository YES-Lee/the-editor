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
}

export type TOC = Array<{
  id: string;
  title: string;
  parent: string;
  level: number;
}>;

export class TheEditor {
  static defaultOptions: Options = {
    lineNumbers: true,
    tabSize: 2,
    gfm: true
  }
  private eventListeners: { [key: string]: any } = {};
  private codemirrorEditor: Codemirror.Editor;
  host: HTMLElement;
  toolbar: Toolbar;
  previewer: Previewer;
  /**
   * The Editor构造函数
   * @param host 宿主元素
   * @param options 选项
   */
  constructor(host: HTMLElement, options?: Options) {
    this.host = host;
    host.classList.add('the_editor')
    const opts = { ...TheEditor.defaultOptions, ...options }

    this.codemirrorEditor = Codemirror(host, {
      mode: opts.gfm ? 'gfm' : 'markdown',
      lineNumbers: opts?.lineNumbers,
      tabSize: opts?.tabSize,
      indentWithTabs: true,
      lineWrapping: true,
      foldGutter: opts?.lineNumbers,
      gutters: opts?.lineNumbers ? ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'] : [],
      value: opts?.value || ''
    });

    this.toolbar = new Toolbar(this);
    this.previewer = new Previewer(this)

    this.emit('change', this.codemirrorEditor.getValue())

    this.codemirrorEditor.on('change', (editor) => {
      this.emit('change', editor.getValue())
    })

    this.codemirrorEditor.on('scroll', (editor) => {
      this.emit('scroll', editor.getScrollInfo());
    })

    this.codemirrorEditor.scrollTo()
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
  setMarkdown(markdown: string): void {
    this.codemirrorEditor.setValue(markdown);
  }

  /**
   * 获取markdown内容
   */
  getMarkdown(): string {
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
