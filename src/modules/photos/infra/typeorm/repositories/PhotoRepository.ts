import { getRepository, Repository } from 'typeorm';

import ICreatePhotoDTO from '@modules/photos/dtos/ICreatePhotoDTO';
import Photo from '@modules/photos/infra/typeorm/entities/Photo';
import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';

class PhotoRepository implements IPhotoRepository {
  private ormRepository: Repository<Photo>;

  constructor() {
    this.ormRepository = getRepository(Photo);
  }

  public async findById(id: string): Promise<Photo | undefined> {
    const photo = await this.ormRepository.findOne(id);

    return photo;
  }

  public async create(data: ICreatePhotoDTO): Promise<Photo> {
    const photo = this.ormRepository.create(data);

    await this.ormRepository.save(photo);

    return photo;
  }

  public async save(photo: ICreatePhotoDTO): Promise<Photo> {
    const photoUploaded = await this.ormRepository.save(photo);

    return photoUploaded;
  }

  public async index(): Promise<Photo[]> {
    const photos = await this.ormRepository.find();

    return photos;
  }

  public async destroy(photo_id: string): Promise<void> {
    await this.ormRepository.delete(photo_id);
  }
}

export default PhotoRepository;
