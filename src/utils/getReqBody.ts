import { IncomingMessage } from 'http';

import { IUser } from '../types/types';

export const getReqBody = (req: IncomingMessage): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    let data: string = '';

    req.on('data', (chunk: Buffer) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      const result = JSON.parse(data);
      resolve(result);
    });

    req.on('error', (error) => {
      reject(error);
    });
  });
};
