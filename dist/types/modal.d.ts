export declare type ModalConfig = {
    title: string;
    content: string | HTMLElement;
    actions?: Array<{
        title: string;
        action: () => void;
    }>;
    onClose?: () => void;
};
export declare class Modal {
    config: ModalConfig;
    container: HTMLElement;
    modal: HTMLElement;
    constructor(config: ModalConfig);
    private create;
    private createHeader;
    private createRooter;
    close(): void;
}
