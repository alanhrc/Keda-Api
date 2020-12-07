import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IProductData {
  filter: string;
}

@injectable()
class ListProductAllService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ filter }: IProductData): Promise<Product[]> {
    const products = await this.productRepository.indexWithFilter(
      String(filter).toUpperCase().trim(),
    );

    return products;
  }
}

export default ListProductAllService;
