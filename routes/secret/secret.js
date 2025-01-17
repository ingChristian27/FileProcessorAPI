import express from 'express';
import { proxyHTTPHandler } from '../../helpers/http/index.js';
import { getFiles, getFile } from '../../apis/secret/index.js';

const router = express.Router();

router.get('/files', (req, res) => proxyHTTPHandler(req, res, getFiles));
router.get('/file', (req, res) => proxyHTTPHandler(req, res, getFile));

export default router;
