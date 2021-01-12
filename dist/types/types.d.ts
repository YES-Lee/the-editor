import { ImageUploadAdaptor } from './interfaces/image-upload-adaptor';
import { Tool } from './interfaces/tool';
export declare type Options = {
    gfm?: boolean;
    value?: string;
    lineNumbers?: boolean;
    tabSize?: number;
    imageUploadAdaptor?: ImageUploadAdaptor;
    toolbar?: {
        visible: boolean;
        items: Array<string | Tool>;
    };
};
export declare type TOC = Array<{
    anchor: string;
    text: string;
    level: number;
}>;
