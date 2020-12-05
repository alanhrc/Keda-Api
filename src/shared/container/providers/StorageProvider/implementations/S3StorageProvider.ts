import fs from 'fs';
import path from 'path';
import mime from 'mime';
import sharp from 'sharp';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: `${process.env.AWS_DEFAULT_REGION}`,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    await sharp(originalPath)
      .rotate()
      .resize(600, 1000, {
        fit: 'inside',
      })
      .jpeg({ quality: 80 })
      .toFile(path.resolve(uploadConfig.uploadsFolder, file));

    const newPathImageResized = path.resolve(uploadConfig.uploadsFolder, file);

    const ContentType = mime.getType(newPathImageResized);

    if (!ContentType) {
      throw new Error('File not found.');
    }

    const fileContent = await fs.promises.readFile(newPathImageResized);

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
    await fs.promises.unlink(newPathImageResized);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: file,
      })
      .promise();
  }
}

export default DiskStorageProvider;
