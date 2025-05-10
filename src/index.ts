import http from 'http';
import 'dotenv/config';

import { findRoute } from './utils/utils';

const PORT = process.env.PORT || 3000;

const startProgram = () => {
  const server = http.createServer((req, res) => {
    const pathname = req.url || '';
    const method = req.method || 'GET';
    findRoute({ method, pathname, req, res});
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};

startProgram();
