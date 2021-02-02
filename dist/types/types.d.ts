import { Plugin, Tool, ImageUploadAdaptor } from './interfaces';
export declare type Options = {
    gfm?: boolean;
    value?: string;
    lineNumbers?: boolean;
    tabSize?: number;
    imageUploadAdaptor?: ImageUploadAdaptor;
    plugins?: Plugin[];
    toolbar?: {
        visible: boolean;
        items: Array<string | Tool>;
    };
} & Record<string, any>;
export declare type TOC = Array<{
    anchor: string;
    text: string;
    level: number;
}>;
