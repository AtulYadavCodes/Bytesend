import { Router } from 'express';
import {
  downloadFile,
  getTextContent,
  healthCheck,
  uploadFile,
  uploadText,
} from '../controllers/transferController.js';

const router = Router();

router.get('/', healthCheck);
router.get('/gtext', getTextContent);
router.post('/ftex', uploadText);
router.post('/fapi', uploadFile);
router.get('/download', downloadFile);

export default router;
