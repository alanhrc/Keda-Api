import multer from 'multer';
import uploadConfig from '@config/upload';

import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PhotoController from '@modules/photos/infra/http/controllers/PhotoController';

const photosRouter = Router();
const uploadPhotos = multer(uploadConfig.multer);

const photoController = new PhotoController();

// productsRouter.use(ensureAuthenticated);

photosRouter.post(
  '/:product_id',
  uploadPhotos.single('photo'),
  photoController.create,
);

photosRouter.get('/', photoController.index);

photosRouter.delete('/:photo_id', photoController.destroy);

export default photosRouter;
