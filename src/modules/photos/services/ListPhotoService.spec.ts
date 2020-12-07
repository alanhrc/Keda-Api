import FakePhotoRepository from '@modules/photos/repositories/fakes/FakePhotoRepository';
import ListPhotoService from '@modules/photos/services/ListPhotoService';

let fakePhotoRepository: FakePhotoRepository;
let listPhotoService: ListPhotoService;

describe('ListProductsWithFilter', () => {
  beforeEach(() => {
    fakePhotoRepository = new FakePhotoRepository();

    listPhotoService = new ListPhotoService(fakePhotoRepository);
  });

  it('should be able to list a product with filter', async () => {
    const photo = await fakePhotoRepository.create({
      path: 'foto.jpg',
      product_id: '1',
    });

    const photo2 = await fakePhotoRepository.create({
      path: 'foto.jpg',
      product_id: '1',
    });

    const photos = await listPhotoService.execute();

    expect(photos).toEqual([photo, photo2]);
  });
});
