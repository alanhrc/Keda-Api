import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  description: string;
  internal_code: string;
  number_code: string;
  specific_code: string;
  observation: string;
  sector: string;
  company: string;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('NotificationsRepository') // private notificationsRepository: INotificationsRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    description,
    internal_code,
    number_code,
    specific_code,
    observation,
    sector,
    company,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productRepository.create({
      description: description
        ? String(description).toUpperCase().trim()
        : description,
      internal_code: internal_code
        ? String(internal_code).toUpperCase().trim()
        : internal_code,
      number_code: number_code
        ? String(number_code).toUpperCase().trim()
        : number_code,
      specific_code: specific_code
        ? String(specific_code).toUpperCase().trim()
        : specific_code,
      observation: observation
        ? String(observation).toUpperCase().trim()
        : observation,
      sector: sector ? String(sector).toUpperCase().trim() : sector,
      company: company ? String(company).toUpperCase().trim() : company,
      quantity: quantity || 0,
    });

    return product;
  }
}

export default CreateProductService;
