import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import ListProductCategoryService from '@modules/products/services/ListProductCategoryService';

let fakeProductRepository: FakeProductRepository;
let listProductCategoryService: ListProductCategoryService;

describe('ListProductsWithFilter', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();

    listProductCategoryService = new ListProductCategoryService(
      fakeProductRepository,
    );
  });

  it('should be able to list a product with category selected', async () => {
    const product = await fakeProductRepository.create({
      description: 'DES',
      internal_code: '000',
      number_code: '000',
      specific_code: '000',
      observation: 'observation',
      company: 'mbb',
      quantity: 150,
      sector: 'CORREIA',
    });

    const productFound = await listProductCategoryService.execute({
      category: product.sector,
    });

    expect(productFound).toEqual([product]);
  });
});
