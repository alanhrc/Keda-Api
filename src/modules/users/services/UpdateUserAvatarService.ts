import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import fs from 'fs';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  avatarFile: Express.Multer.File;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFile }: IRequest): Promise<User> {
    try {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('Only authenticated users can change avatar.', 401);
      }

      const filename = await this.storageProvider.saveFile(avatarFile);

      if (user.avatar) {
        await this.storageProvider.deleteFile(user.avatar);
      }

      user.avatar = filename;

      await this.usersRepository.save(user);

      return user;
    } catch (err) {
      console.log(err);

      const originalPath = path.resolve(
        uploadConfig.tmpFolder,
        avatarFile.filename,
      );

      await fs.promises.unlink(originalPath);

      throw new AppError('Erro while upload avatar, please try again.', 404);
    }
  }
}

export default UpdateUserAvatarService;
