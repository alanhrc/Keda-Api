import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';

// import Photo from '@modules/photos/infra/typeorm/entities/Photo';

interface IRequest {
  product_id: string;
  file: Express.Multer.File;
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

  public async execute({ product_id, file }: IRequest): Promise<void> {
    const product = await this.productRepository.findById(product_id);

    if (!product) {
      throw new AppError('Only saved photos in existent products.');
    }

    try {
      const filenameSaved = await this.storageProvider.saveFile(file);

      await this.photoRepository.create({
        product_id,
        path: filenameSaved,
      });

      return;
    } catch (err) {
      console.log(err);

      const originalPath = path.resolve(uploadConfig.tmpFolder, file.filename);
      await fs.promises.unlink(originalPath);
    }
  }
}

export default CreatePhotoService;
