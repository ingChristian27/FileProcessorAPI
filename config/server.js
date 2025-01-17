import './env.js'; // Load environment variables
import express from 'express';
import routes from '../routes/index.js';
import cors from 'cors';
import morgan from 'morgan';

import { corsOptions, port } from './constants.js';

const app = express();

// Middleware for logging HTTP requests
app.use(morgan('combined'));

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS with custom options
app.use(cors(corsOptions));

// Set up routes under the '/v1' path
app.use('/v1', routes);

// Start the server and log the URL
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
