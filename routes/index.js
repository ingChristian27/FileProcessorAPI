import express from 'express';
import filesRouter from './secret/secret.js';

const router = express.Router();

router.use('/secret', filesRouter);

export default router;
