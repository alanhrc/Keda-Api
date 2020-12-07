import AppError from '@shared/errors/AppError';

import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import FakePhotoRepository from '@modules/photos/repositories/fakes/FakePhotoRepository';
import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import CreatePhotoService from '@modules/photos/services/CreatePhotoService';

let fakeProductRepository: FakeProductRepository;
let fakePhotoRepository: FakePhotoRepository;
let fakeStorageAvatar: FakeStorageAvatar;
let createPhotoService: CreatePhotoService;

describe('CreatePhoto', () => {
  beforeEach(() => {
    fakeProductRepository = new FakeProductRepository();
    fakeStorageAvatar = new FakeStorageAvatar();
    fakePhotoRepository = new FakePhotoRepository();

    createPhotoService = new CreatePhotoService(
      fakeProductRepository,
      fakeStorageAvatar,
      fakePhotoRepository,
    );
  });

  it('should be able to create a new photo product', async () => {
    const product = await fakeProductRepository.create({
      description: 'Description',
      internal_code: '000',
      number_code: '000',
      specific_code: '000',
      observation: 'observation',
      sector: 'Polimento',
      company: 'mbb',
      quantity: 150,
    });

    const photo = await createPhotoService.execute({
      path: 'photo.jpg',
      product_id: product.id,
    });

    expect(photo).toHaveProperty('id');
    expect(photo.path).toBe('photo.jpg');
  });

  it('should not be able to create a new photo to inexistent product', async () => {
    await expect(
      createPhotoService.execute({
        path: 'photo.jpg',
        product_id: 'inexistent-product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
