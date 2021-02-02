import { TheEditor } from '../editor';
import { Plugin } from '../interfaces';
export declare class Previewer implements Plugin {
    name: string;
    previewer: HTMLElement;
    editor: TheEditor;
    visible: boolean;
    enabled: boolean;
    constructor();
    install(editor: TheEditor, options: Record<string, any>): void;
    initScroll(): void;
    toggleVisible(): void;
    enable(): void;
    disable(): void;
}
