import AppError from '@shared/errors/AppError';

import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import DeleteProductService from '@modules/products/services/DeleteProductService';

let fakeProductRepository: FakeProductRepository;
let fakeStorageAvatar: FakeStorageAvatar;
let deleteProductService: DeleteProductService;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    fakeStorageAvatar = new FakeStorageAvatar();

    deleteProductService = new DeleteProductService(
      fakeProductRepository,
      fakeStorageAvatar,
    );
  });

  it('should be able to delete a product', async () => {
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

    await expect(
      deleteProductService.execute({
        id: product.id,
      }),
    ).resolves;
  });

  it('should not be able to delete a inexistent product', async () => {
    await expect(
      deleteProductService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
