import { uuid } from 'uuidv4';

import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';
import ICreatePhotoDTO from '@modules/photos/dtos/ICreatePhotoDTO';

import Photo from '@modules/photos/infra/typeorm/entities/Photo';

class FakePhotoRepository implements IPhotoRepository {
  private photos: Photo[] = [];

  public async findById(id: string): Promise<Photo | undefined> {
    const findPhoto = this.photos.find(photo => photo.id === id);

    return findPhoto;
  }

  public async create(data: ICreatePhotoDTO): Promise<Photo> {
    const photo = new Photo();

    Object.assign(photo, { id: uuid() }, data);

    this.photos.push(photo);

    return photo;
  }

  public async save(data: Photo): Promise<Photo> {
    const findIndex = this.photos.findIndex(
      findPhoto => findPhoto.id === data.id,
    );

    this.photos[findIndex] = data;

    return data;
  }

  public async index(): Promise<Photo[]> {
    return this.photos;
  }

  public async destroy(photo_id: string): Promise<void> {
    const findIndex = this.photos.findIndex(
      findPhoto => findPhoto.id === photo_id,
    );

    this.photos.splice(findIndex, 1);
  }
}

export default FakePhotoRepository;
