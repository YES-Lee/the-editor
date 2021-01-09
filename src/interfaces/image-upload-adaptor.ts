export interface ImageUploadAdaptor {
  upload(images: File[]): string[] | Promise<string[]>;
}
