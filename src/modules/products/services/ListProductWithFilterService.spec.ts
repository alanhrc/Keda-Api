import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import ListProductWithFilterService from '@modules/products/services/ListProductWithFilterService';

let fakeProductRepository: FakeProductRepository;
let listProductWithFilterService: ListProductWithFilterService;

describe('ListProductsWithFilter', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    listProductWithFilterService = new ListProductWithFilterService(
      fakeProductRepository,
    );
  });

  it('should be able to list a product with filter', async () => {
    const product = await fakeProductRepository.create({
      description: 'DES',
      internal_code: '000',
      number_code: '000',
      specific_code: '000',
      observation: 'observation',
      company: 'mbb',
      quantity: 150,
      sector: 'Correia',
    });

    const productFound = await listProductWithFilterService.execute({
      filter: product.description,
    });

    expect(productFound).toEqual([product]);
  });
});
