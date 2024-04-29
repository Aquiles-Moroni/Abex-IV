import express from 'express';
import * as noticiasController from '../controllers/noticias.Controller.js';

const router = express.Router();

router.get('/noticias', noticiasController.buscarNoticias);
router.post('/noticias', noticiasController.criarNoticias);
router.get('/noticias/:id', noticiasController.buscarNoticiasPorId);
router.put('/noticias/:id', noticiasController.atualizarNoticiasPorId);
router.delete('/noticias/:id', noticiasController.daletarNoticiasPorId);

export default router;
