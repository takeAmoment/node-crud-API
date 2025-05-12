import { IncomingMessage } from 'http';

import { IFailedResponse, IUser } from '../types/types';
import { ResponseMessagesEnum, StatusCodesEnum } from '../types/enums';

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

    req.on('error', (err) => {
      const error: IFailedResponse = {
        code: StatusCodesEnum.INTERNAL_SERVER_ERROR,
        message: `${ResponseMessagesEnum.SERVER_ERROR} ${err.message}`,
      };
      reject(error);
    });
  });
};
