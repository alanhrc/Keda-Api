import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  namePhoto: string;
}

@injectable()
class UpdatePhotoProfileProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    namePhoto,
  }: IRequest): Promise<Product | undefined> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.photo_profile = namePhoto;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdatePhotoProfileProductService;
