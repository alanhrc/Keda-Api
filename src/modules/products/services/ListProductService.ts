import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.index();

    return products;
  }
}

export default ListProductService;
