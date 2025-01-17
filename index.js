import express from 'express';
import routes from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { corsOptions, port } from './config.js';

dotenv.config();

const app = express();

app.use(morgan('combined')); // logging
app.use(express.json());
app.use(cors(corsOptions));

app.use('/v1', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
