import ICreatePhotoDTO from '@modules/photos/dtos/ICreatePhotoDTO';

import Photo from '@modules/photos/infra/typeorm/entities/Photo';

export default interface IPhotoRepository {
  findById(photo_id: string): Promise<Photo | undefined>;
  create({ path, product_id }: ICreatePhotoDTO): Promise<Photo>;
  save(photo: ICreatePhotoDTO): Promise<Photo>;
  index(): Promise<Photo[]>;
  destroy(id: string): Promise<void>;
}
