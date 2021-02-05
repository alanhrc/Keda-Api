import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    return console.log('Connection sucess');
  })
  .catch(() => {
    return console.log('Connection error');
  });
