import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';

import Photo from '@modules/photos/infra/typeorm/entities/Photo';

interface IRequest {
  product_id: string;
  filename: string;
  mimetype: string;
}

@injectable()
class CreatePhotoService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('PhotoRepository')
    private photoRepository: IPhotoRepository,
  ) {}

  public async execute({
    product_id,
    filename,
    mimetype,
  }: IRequest): Promise<Photo> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Only saved photos in existent products.');
    }

    try {
      const filenameSaved = await this.storageProvider.saveFile({
        filename,
        mimetype,
      });

      const photo = await this.photoRepository.create({
        product_id,
        path: filenameSaved,
      });

      return photo;
    } catch (err) {
      console.log(err);

      const originalPath = path.resolve(uploadConfig.tmpFolder, filename);
      await fs.promises.unlink(originalPath);

      return err;
    }
  }
}

export default CreatePhotoService;
