import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserService = container.resolve(ListUserService);

    const users = await listUserService.execute();

    return response.json(classToClass(users));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return response.json({ message: 'User successfully deleted.' });
  }
}
