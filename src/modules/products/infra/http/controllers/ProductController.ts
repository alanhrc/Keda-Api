import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductService from '@modules/products/services/ListProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ListProductWithFilterService from '@modules/products/services/ListProductWithFilterService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductCategoryService from '@modules/products/services/ListProductCategoryService';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      description,
      internal_code,
      number_code,
      specific_code,
      observation,
      sector,
      company,
      quantity,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      description,
      internal_code,
      number_code,
      specific_code,
      observation,
      sector,
      company,
      quantity,
    });

    return response.json(classToClass(product));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProductService = container.resolve(ListProductService);

    const products = await listProductService.execute();

    return response.json(classToClass(products));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      description,
      internal_code,
      number_code,
      specific_code,
      observation,
      sector,
      company,
      quantity,
    } = request.body;

    const updateProductService = container.resolve(UpdateProductService);

    const product = await updateProductService.execute({
      id,
      description,
      internal_code,
      number_code,
      specific_code,
      observation,
      sector,
      company,
      quantity,
    });

    return response.json(classToClass(product));
  }

  public async indexWithFilter(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { filter } = request.query;

    const listProductWithFilter = container.resolve(
      ListProductWithFilterService,
    );

    const products = await listProductWithFilter.execute({
      filter: String(filter),
    });

    return response.json(classToClass(products));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);

    await deleteProductService.execute({ id });

    return response.json({ message: 'Product successfully deleted ' });
  }

  public async indexCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { category } = request.params;

    const listProductCategoryService = container.resolve(
      ListProductCategoryService,
    );

    const products = await listProductCategoryService.execute({
      category: String(category),
    });

    return response.json(classToClass(products));
  }
}
