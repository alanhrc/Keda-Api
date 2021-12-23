import uploadAvatarConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: Express.Multer.File): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadAvatarConfig.tmpFolder, file.filename),
      path.resolve(uploadAvatarConfig.uploadsFolder, file.filename),
    );

    return file.filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.resolve(uploadAvatarConfig.uploadsFolder, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
