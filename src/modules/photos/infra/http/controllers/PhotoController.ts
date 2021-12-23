import fs from 'fs';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePhotoService from '@modules/photos/services/CreatePhotoService';
import ListPhotoService from '@modules/photos/services/ListPhotoService';
import DeletePhotoService from '@modules/photos/services/DeletePhotoService';

export default class PhotoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const photo = request.file as Express.Multer.File;

    console.log(photo);

    if (!product_id || !photo) {
      return response.json({ message: 'Product id and photo must be sent' });
    }

    const createPhotoService = container.resolve(CreatePhotoService);

    try {
      await createPhotoService.execute({
        product_id,
        file: photo,
      });

      return response.status(200).send();
    } catch (err) {
      await fs.promises.stat(photo.path);

      await fs.promises.unlink(photo.path);

      return response.json(err);
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPhotoService = container.resolve(ListPhotoService);

    const photos = await listPhotoService.execute();

    return response.json(classToClass(photos));
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { photo_id } = request.params;

    const deletePhotoService = container.resolve(DeletePhotoService);

    await deletePhotoService.execute({ photo_id });

    return response.json({ message: 'Product successfully deleted ' });
  }
}
