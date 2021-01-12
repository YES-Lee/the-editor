import { TheEditor } from './editor';
export declare class Previewer {
    private previewer;
    private editor;
    visible: boolean;
    constructor(editor: TheEditor);
    initScroll(): void;
    toggleVisible(): void;
}
