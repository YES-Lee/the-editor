import { TheEditor } from './editor';
import { Tool } from './interfaces/tool';
export declare class Toolbar {
    private editor;
    private toolbar;
    constructor(editor: TheEditor);
    createTools(tools: Array<string | Tool>): void;
}
