import http from 'http';
import 'dotenv/config';

const PORT = process.env.PORT;

const startProgram = () => {
  const server = http.createServer((req, res) => {
    console.log(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};

startProgram();
