import AppError from '@shared/errors/AppError';

import FakePhotoRepository from '@modules/photos/repositories/fakes/FakePhotoRepository';
import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import DeletePhotoService from '@modules/photos/services/DeletePhotoService';

let fakePhotoRepository: FakePhotoRepository;
let fakeStorageAvatar: FakeStorageAvatar;
let deletePhotoService: DeletePhotoService;

describe('DeletePhoto', () => {
  beforeEach(() => {
    fakePhotoRepository = new FakePhotoRepository();
    fakeStorageAvatar = new FakeStorageAvatar();

    deletePhotoService = new DeletePhotoService(
      fakePhotoRepository,
      fakeStorageAvatar,
    );
  });

  it('should be able to delete a photo', async () => {
    const photo = await fakePhotoRepository.create({
      path: 'foto.jpg',
      product_id: '1',
    });

    await expect(
      deletePhotoService.execute({
        photo_id: photo.id,
      }),
    ).resolves;
  });

  it('should not be able to delete a inexistent photo', async () => {
    await expect(
      deletePhotoService.execute({
        photo_id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
