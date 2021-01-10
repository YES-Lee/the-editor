import { ImageUploadAdaptor } from './interfaces/image-upload-adaptor';
export declare type Options = {
    gfm?: boolean;
    value?: string;
    lineNumbers?: boolean;
    tabSize?: number;
    imageUploadAdaptor?: ImageUploadAdaptor;
};
export declare type TOC = Array<{
    anchor: string;
    text: string;
    level: number;
}>;
