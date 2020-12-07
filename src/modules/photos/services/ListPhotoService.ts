import { injectable, inject } from 'tsyringe';

import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';
import Photo from '@modules/photos/infra/typeorm/entities/Photo';

@injectable()
class ListProductAllService {
  constructor(
    @inject('PhotoRepository')
    private photoRepository: IPhotoRepository,
  ) {}

  public async execute(): Promise<Photo[]> {
    const photos = await this.photoRepository.index();

    return photos;
  }
}

export default ListProductAllService;
