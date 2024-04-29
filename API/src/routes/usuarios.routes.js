import express from 'express';
import * as usuarioController from '../controllers/usuarios.Controller.js';

const router = express.Router();

router.get('/usuarios', usuarioController.buscarUsuario);
router.post('/usuarios', usuarioController.criarUsuario);
router.get('/usuarios/:id', usuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', usuarioController.atualizarUsuarioPorId);
router.delete('/usuarios/:id', usuarioController.deletarUsuarioPorId);

export default router;
