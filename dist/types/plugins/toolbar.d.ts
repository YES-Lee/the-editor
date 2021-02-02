import { TheEditor } from '../editor';
import { Plugin, Tool } from '../interfaces';
export declare class Toolbar implements Plugin {
    static builtinTools: Map<string, Tool>;
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
