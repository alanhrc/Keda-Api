import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import DeleteUserService from '@modules/users/services/DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageAvatar: FakeStorageAvatar;
let deleteUserService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageAvatar = new FakeStorageAvatar();

    deleteUserService = new DeleteUserService(
      fakeUsersRepository,
      fakeStorageAvatar,
    );
  });

  it('should be able to delete a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Alan Henrique',
      email: 'alan@alan.com',
      password: '123456',
    });

    await expect(
      deleteUserService.execute({
        id: user.id,
      }),
    ).resolves;
  });

  it('should not be able to delete a inexistent user', async () => {
    await expect(
      deleteUserService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
