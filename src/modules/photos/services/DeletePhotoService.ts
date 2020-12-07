import { injectable, inject } from 'tsyringe';

import IPhotoRepository from '@modules/photos/repositories/IPhotoRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  photo_id: string;
}

@injectable()
class DeletePhotoService {
  constructor(
    @inject('PhotoRepository')
    private photoRepository: IPhotoRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ photo_id }: IRequest): Promise<void> {
    const photo = await this.photoRepository.findById(photo_id);

    if (!photo) {
      throw new AppError('Photo not found.');
    }

    await this.storageProvider.deleteFile(photo.path);

    await this.photoRepository.destroy(photo_id);
  }
}

export default DeletePhotoService;
