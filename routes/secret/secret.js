import express from 'express';
import { proxyHTTPHandler } from '../../helpers/http/index.js';
import { getFiles } from '../../apis/secret/index.js';

const router = express.Router();

router.get('/files', (req, res) => proxyHTTPHandler(req, res, getFiles));

export default router;
