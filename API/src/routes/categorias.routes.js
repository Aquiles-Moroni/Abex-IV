import express from 'express';
import * as categoriasController from '../controllers/categorias.Controller.js';

const router = express.Router();

router.get('/categorias', categoriasController.buscarCategoria);
router.post('/categorias', categoriasController.criarCategoria);
router.get('/categorias/:id', categoriasController.buscarCategoriaPorId);
router.put('/categorias/:id', categoriasController.atualizarCategoriaPorId);
router.delete('/categorias/:id', categoriasController.deletarCategoriaPorId);

export default router;
