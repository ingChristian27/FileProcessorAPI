import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') dotenv.config({ path: '.env.production' });
else dotenv.config();

console.log('Environment variables loaded.');
