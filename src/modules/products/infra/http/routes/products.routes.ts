import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductController from '@modules/products/infra/http/controllers/ProductController';

const productsRouter = Router();
const productController = new ProductController();

// productsRouter.use(ensureAuthenticated);

productsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     internal_code: Joi.string(),
  //     number_code: Joi.string(),
  //     string_code: Joi.string(),
  //     description: Joi.string(),
  //     observation: Joi.string(),
  //     type: Joi.string(),
  //     sector: Joi.string(),
  //     factory: Joi.string(),
  //     quantity: Joi.number(),
  //   },
  // }),
  productController.create,
);

productsRouter.get('/', productController.index);

productsRouter.get('/:id', productController.show);

productsRouter.put(
  '/:id',
  // celebrate({
  //   [Segments.BODY]: {
  //     internal_code: Joi.string(),
  //     number_code: Joi.string(),
  //     string_code: Joi.string(),
  //     description: Joi.string(),
  //     observation: Joi.string(),
  //     type: Joi.string(),
  //     sector: Joi.string(),
  //     factory: Joi.string(),
  //     quantity: Joi.number(),
  //   },
  // }),
  productController.update,
);

productsRouter.post('/filter', productController.indexWithFilter);

productsRouter.delete('/:id', productController.destroy);

productsRouter.post('/category/:category', productController.indexCategory);

export default productsRouter;
