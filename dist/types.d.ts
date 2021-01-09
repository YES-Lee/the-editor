import { ImageUploadAdaptor } from './interfaces/image-upload-adaptor';
export declare type Options = {
    gfm?: boolean;
    value?: string;
    lineNumbers?: boolean;
    tabSize?: number;
    imageUploadAdaptor?: ImageUploadAdaptor;
};
export declare type TOC = Array<{
    id: string;
    title: string;
    parent: string;
    level: number;
}>;
