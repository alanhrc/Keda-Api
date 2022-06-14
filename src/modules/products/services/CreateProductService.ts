import { injectable, inject } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
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
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository, // @inject('NotificationsRepository') // private notificationsRepository: INotificationsRepository, // @inject('CacheProvider') // private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    description,
    internal_code,
    number_code,
    specific_code,
    observation,
    sector,
    company,
    quantity,
    minimum_quantity,
  }: IRequest): Promise<Product> {
    const existentProduct = await this.productRepository.findByCode(
      number_code,
    );

    if (existentProduct) {
      throw new AppError('Este produto já esta cadastrado.');
    }

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
      quantity: Number(quantity) ? Number(quantity) : 0,
      minimum_quantity: Number(minimum_quantity) ? Number(minimum_quantity) : 0,
    });

    return product;
  }
}

export default CreateProductService;
