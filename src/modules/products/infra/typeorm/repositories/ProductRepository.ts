import { getRepository, Like, Repository } from 'typeorm';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductRepository from '@modules/products/repositories/IProductRepository';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(data: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.save(data);

    return product;
  }

  public async index(): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { isActive: true },
      order: { description: 'ASC' },
      relations: ['photos'],
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id, {
      relations: ['photos'],
    });

    return product;
  }

  public async indexWithFilter(filter: string): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: [
        {
          description: Like(`%${filter}%`),
          isActive: true,
        },
        {
          internal_code: Like(`%${filter}%`),
          isActive: true,
        },
        {
          number_code: Like(`%${filter}%`),
          isActive: true,
        },
        {
          specific_code: Like(`%${filter}%`),
          isActive: true,
        },
        {
          observation: Like(`%${filter}%`),
          isActive: true,
        },
      ],
      relations: ['photos'],
      order: { description: 'ASC' },
    });

    return products;
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByCode(code: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { number_code: code },
    });

    return product;
  }
}

export default ProductRepository;
