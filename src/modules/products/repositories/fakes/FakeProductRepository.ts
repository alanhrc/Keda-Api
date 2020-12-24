import { uuid } from 'uuidv4';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '@modules/products/infra/typeorm/entities/Product';

class FakeProductsRepository implements IProductRepository {
  private products: Product[] = [];

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, data);

    this.products.push(product);

    return product;
  }

  public async index(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async save(data: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === data.id,
    );

    this.products[findIndex] = data;

    return data;
  }

  public async indexWithFilter(filter: string): Promise<Product[]> {
    const products = this.products.filter(
      product => product.description === filter,
    );

    return products;
  }

  public async destroy(id: string): Promise<void> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === id,
    );

    this.products.splice(findIndex, 1);
  }

  public async findByCode(code: string): Promise<Product | undefined> {
    const findProduct = this.products.find(
      product => product.number_code === code,
    );

    return findProduct;
  }
}

export default FakeProductsRepository;
