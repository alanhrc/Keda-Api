import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

function retira_acentos(word: string) {
  const com_acento =
    'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';

  const sem_acento =
    'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  let newWord = '';
  for (let i = 0; i < word.length; i++) {
    let troca = false;
    for (let a = 0; a < com_acento.length; a++) {
      if (word.substr(i, 1) == com_acento.substr(a, 1)) {
        newWord += sem_acento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      newWord += word.substr(i, 1);
    }
  }
  return newWord;
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const nameLower = file.originalname.toLowerCase().trim();
        const primaryNameImage = nameLower.split(' ');
        const nameCleaned = retira_acentos(primaryNameImage[0]);
        const fileName = `${fileHash}_${nameCleaned}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: `${process.env.AWS_BUCKET}`,
    },
  },
} as IUploadConfig;
