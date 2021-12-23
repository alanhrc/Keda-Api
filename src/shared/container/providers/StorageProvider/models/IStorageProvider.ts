export default interface IStorageProvider {
  saveFile(file: Express.Multer.File): Promise<string>;
  deleteFile(filename: string): Promise<void>;
}
