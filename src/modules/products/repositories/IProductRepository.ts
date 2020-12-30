import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface IAppointmentsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  index(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  save(data: ICreateProductDTO): Promise<Product>;
  indexWithFilter(filter: string): Promise<Product[]>;
  destroy(id: string): Promise<void>;
  findByCode(code: string): Promise<Product | undefined>;
  indexCategory(category: string): Promise<Product[]>;
}
