import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // await fs.promises.rename(
    //   path.resolve(uploadConfig.tmpFolder, file),
    //   path.resolve(uploadConfig.uploadsFolder, file),
    // );

    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    await sharp(originalPath)
      .rotate()
      .resize(600, 1000, {
        fit: 'inside',
      })
      .jpeg({ quality: 80 })
      .toFile(path.resolve(uploadConfig.uploadsFolder, file));

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
