import express from 'express';
import { proxyHTTPHandler } from '../../helpers/http/index.js';
import { getFiles } from '../../apis/files/index.js';

const router = express.Router();

router.get('/data', (req, res) => proxyHTTPHandler(req, res, getFiles));

export default router;
