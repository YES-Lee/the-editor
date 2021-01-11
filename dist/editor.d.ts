import Codemirror, { ScrollInfo } from 'codemirror';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import { Previewer } from './previewer';
import { Toolbar } from './toolbar';
import type { Options, TOC } from './types';
import './styles/index.scss';
export declare class TheEditor {
    static defaultOptions: Options;
    private eventListeners;
    private toc;
    private html;
    codemirrorEditor: Codemirror.Editor;
    options: Options;
    host: HTMLElement;
    toolbar?: Toolbar;
    previewer?: Previewer;
    /**
     * The Editor构造函数
     * @param host 宿主元素
     * @param options 选项
     */
    constructor(host: HTMLElement, options?: Options);
    on(event: 'change', handler: (value: string) => void): void;
    on(event: 'scroll', handler: (scrollInfo: ScrollInfo) => void): void;
    off(event: string, handler: any): void;
    emit(event: 'change', value: string): void;
    emit(event: 'scroll', scrollInfo: ScrollInfo): void;
    scrollToPercent(percent: number): void;
    /**
     * 设置markdown内容
     * @param markdown markdown文本
     */
    setValue(markdown: string): void;
    /**
     * 获取markdown内容
     */
    getValue(): string;
    /**
     * 获取html文本
     */
    getHTML(): string;
    /**
     * 获取TOC
     */
    getTOC(): TOC;
    private updateHTML;
}
