import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
