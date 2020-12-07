import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

import IPhotoRepositoy from '@modules/photos/repositories/IPhotoRepositoy';
import PhotoRepository from '@modules/photos/infra/typeorm/repositories/PhotoRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IPhotoRepositoy>(
  'PhotoRepository',
  PhotoRepository,
);
