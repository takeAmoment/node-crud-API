import http from 'http';

import { findRoute } from './utils/utils';
import { IUser } from './types/types';

export const startProgram = (port: number | string, getUsers: () => Array<IUser>) => {
  const server = http.createServer((req, res) => {
    const users = getUsers();
    const pathname = req.url || '';
    const method = req.method || 'GET';
    console.log(method, port, pathname);
    findRoute({ method, pathname, req, res, users });
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};