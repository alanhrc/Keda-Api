import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (product.photos) {
      product.photos.map(async photo => {
        await this.storageProvider.deleteFile(photo.path);
      });
    }

    await this.productRepository.destroy(id);
  }
}

export default DeleteProductService;
