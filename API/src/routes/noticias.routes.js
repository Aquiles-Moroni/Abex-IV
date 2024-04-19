import express from 'express';
import * as newsController from '../controllers/noticias.Controller.js';

const router = express.Router();

router.get('/news', newsController.getNews);
router.post('/news', newsController.createNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', newsController.updateNewsById);
router.delete('/news/:id', newsController.deleteNewsById);

export default router;
