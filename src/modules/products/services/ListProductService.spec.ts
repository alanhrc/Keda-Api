import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import ListProductService from '@modules/products/services/ListProductService';

let fakeProductRepository: FakeProductRepository;
let listProductService: ListProductService;

describe('ListProductsWithFilter', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    listProductService = new ListProductService(fakeProductRepository);
  });

  it('should be able to list a product with filter', async () => {
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

    const productFound = await listProductService.execute();

    expect(productFound).toEqual([product]);
  });
});
