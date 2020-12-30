import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IProductData {
  category: string;
}

@injectable()
class ListProductCategoryService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ category }: IProductData): Promise<Product[]> {
    const products = await this.productRepository.indexCategory(category);

    return products;
  }
}

export default ListProductCategoryService;
