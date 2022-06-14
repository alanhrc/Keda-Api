import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  description: string;
  internal_code: string;
  number_code: string;
  specific_code: string;
  observation: string;
  sector: string;
  company: string;
  quantity: number;
  minimum_quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    id,
    description,
    internal_code,
    number_code,
    specific_code,
    observation,
    sector,
    company,
    quantity,
    minimum_quantity,
  }: IRequest): Promise<Product | undefined> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    product.description = description
      ? String(description).toUpperCase().trim()
      : product.description;

    product.internal_code = internal_code
      ? String(internal_code).toUpperCase().trim()
      : product.internal_code;

    product.number_code = number_code
      ? String(number_code).toUpperCase().trim()
      : product.number_code;

    product.specific_code = specific_code
      ? String(specific_code).toUpperCase().trim()
      : product.specific_code;

    product.observation = String(observation).toUpperCase().trim();

    product.sector = sector
      ? String(sector).toUpperCase().trim()
      : product.sector;

    product.company = company
      ? String(company).toUpperCase().trim()
      : product.company;

    product.quantity = Number(quantity);

    product.minimum_quantity = Number(minimum_quantity);

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
