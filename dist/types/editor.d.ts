import Codemirror, { ScrollInfo } from 'codemirror';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/gfm/gfm';
import { Plugin } from './interfaces';
import type { Options, TOC } from './types';
import { DialogConfig } from './dialog';
import './styles/index.scss';
/**
 * TheEditor构造函数
 */
export declare class TheEditor {
    static builtInPlugins: Record<string, Function>;
    /**
     * 编辑器默认配置
     */
    static defaultOptions: Options;
    private eventListeners;
    private toc;
    private html;
    private dialog?;
    /**
     * 插件实例
     */
    plugins: Map<string, Plugin>;
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
    constructor(host: HTMLElement, options?: Options);
    on(event: 'change', handler: (value: string) => void): void;
    on(event: 'scroll', handler: (scrollInfo: ScrollInfo) => void): void;
    /**
     * 取消监听事件
     * @param event 事件名称
     * @param handler 处理函数
     */
    off(event: string, handler: any): void;
    emit(event: 'change', value: string): void;
    emit(event: 'scroll', scrollInfo: ScrollInfo): void;
    /**
     * 按比例滚动
     * @param percent 滚动比例
     */
    scrollToPercent(percent: number): void;
    /**
     * 显示对话框
     * @param config 对话框配置
     */
    openDialog(config: DialogConfig): void;
    /**
     * 关闭对话框
     */
    closeDialog(): void;
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
    /**
     * 更新HTML和TOC
     */
    private updateHTML;
    /**
     * 粘贴图片自动上传
     */
    private initPaseImage;
    /**
     * 安装插件
     * @param PluginFn 插件
     */
    private installPlugins;
}
