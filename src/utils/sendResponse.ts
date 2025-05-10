import { ISendResponseProps } from '../types/types';

export const sendResponse = <T>({ code, data, res }: ISendResponseProps<T>) => {
  res.writeHead(code, {
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(data));
  return;
};
