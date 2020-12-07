import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import AppError from '@shared/errors/AppError';

let fakeProductRepository: FakeProductRepository;
let updateProductService: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    updateProductService = new UpdateProductService(fakeProductRepository);
  });

  it('should be able to update a product', async () => {
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

    const productUpdated = await updateProductService.execute({
      id: product.id,
      description: 'Description',
      internal_code: '111',
      number_code: '000',
      specific_code: '000',
      observation: 'observation',
      company: 'mbb',
      quantity: 150,
      sector: 'Correia',
    });

    expect(productUpdated?.internal_code).toBe('111');
  });

  it('should not be able to update a inexistent product', async () => {
    await expect(
      updateProductService.execute({
        id: 'inexistent-id',
        description: 'Description',
        internal_code: '111',
        number_code: '000',
        specific_code: '000',
        observation: 'observation',
        company: 'mbb',
        quantity: 150,
        sector: 'Correia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
