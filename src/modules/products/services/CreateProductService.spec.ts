import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import CreateProductService from '@modules/products/services/CreateProductService';

let fakeProductRepository: FakeProductRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    createProduct = new CreateProductService(fakeProductRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      description: 'Description',
      internal_code: '000',
      number_code: '000',
      specific_code: '000',
      observation: 'observation',
      sector: 'Polimento',
      company: 'mbb',
      quantity: 150,
    });

    expect(product).toHaveProperty('id');
  });
});
