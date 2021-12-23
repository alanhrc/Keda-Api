import uploadAvatarConfig from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: `${process.env.AWS_DEFAULT_REGION}`,
    });
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    const originalPath = path.resolve(
      uploadAvatarConfig.tmpFolder,
      file.filename,
    );

    const optimizedImage = await sharp(originalPath)
      .resize(1280, 720, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat('jpeg', { progressive: true, quality: 50 })
      .toBuffer();

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Body: optimizedImage,
        Key: file.filename,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file.filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}`,
        Key: filename,
      })
      .promise();
  }
}

export default S3StorageProvider;
