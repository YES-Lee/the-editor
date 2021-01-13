export declare type DialogConfig = {
    title: string;
    content: string | HTMLElement;
    actions?: Array<{
        title: string;
        action?: () => void;
    }>;
    onClose?: () => void;
};
export declare class Dialog {
    config: DialogConfig;
    container: HTMLElement;
    dialog: HTMLElement;
    constructor(config: DialogConfig);
    private create;
    private createHeader;
    private createRooter;
    close(): void;
}
