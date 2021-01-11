import { injectable, inject } from 'tsyringe';

import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  photo_id: string;
}

@injectable()
class DeletePhotoService {
  constructor(
    @inject('PhotoRepository')
    private photoRepository: IPhotoRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ photo_id }: IRequest): Promise<void> {
    const photo = await this.photoRepository.findById(photo_id);

    if (!photo) {
      throw new AppError('Photo not found.');
    }

    const product = await this.productRepository.findById(photo.product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.photo_profile = '';

    await this.productRepository.save(product);

    await this.storageProvider.deleteFile(photo.path);

    await this.photoRepository.destroy(photo_id);
  }
}

export default DeletePhotoService;
