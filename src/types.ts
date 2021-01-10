import { ImageUploadAdaptor } from './interfaces/image-upload-adaptor';

export type Options = {
  gfm?: boolean;
  value?: string;
  lineNumbers?: boolean;
  tabSize?: number;
  imageUploadAdaptor?: ImageUploadAdaptor;
}

export type TOC = Array<{
  anchor: string;
  text: string;
  level: number;
}>;
