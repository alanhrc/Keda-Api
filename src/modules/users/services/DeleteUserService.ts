import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
