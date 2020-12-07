import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profleRouter from '@modules/users/infra/http/routes/profile.routes';

import productsRouter from '@modules/products/infra/http/routes/products.routes';
import photosRouter from '@modules/photos/infra/http/routes/photos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profleRouter);

routes.use('/products', productsRouter);
routes.use('/photos', photosRouter);

export default routes;
