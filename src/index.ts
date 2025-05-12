import 'dotenv/config';

import { startProgram } from './startProgram';
import { users } from './localDb/users';


const PORT = process.env.PORT || 3000;

startProgram(PORT, () => users);
