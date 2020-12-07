import AppError from '@shared/errors/AppError';

import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import ShowProductService from '@modules/products/services/ShowProductService';

let fakeProductRepository: FakeProductRepository;
let showProductService: ShowProductService;

describe('ShowProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    showProductService = new ShowProductService(fakeProductRepository);
  });

  it('should be able to show a product', async () => {
    const product = await fakeProductRepository.create({
      description: 'Description',
      internal_code: '000',
      number_code: '000',
      specific_code: '000',
      observation: 'observation',
      company: 'mbb',
      quantity: 150,
      sector: 'Correia',
    });

    const productFound = await showProductService.execute({
      id: product.id,
    });

    expect(productFound.id).toBe(product.id);
  });

  it('should not be able to show a non existing product', async () => {
    await expect(
      showProductService.execute({
        id: 'non-existing-product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
