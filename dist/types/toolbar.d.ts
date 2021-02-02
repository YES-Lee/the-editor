import { TheEditor } from './editor';
import { Plugin } from './interfaces/plugin';
import { Tool } from './interfaces/tool';
export declare class Toolbar implements Plugin {
    name: string;
    enabled: boolean;
    private editor;
    private toolbar;
    constructor();
    install(editor: TheEditor, options: Record<string, any>): void;
    enable(): void;
    disable(): void;
    createTools(tools: Array<string | Tool>): void;
    private onClickTool;
}
