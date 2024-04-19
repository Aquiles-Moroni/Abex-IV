import express from 'express';
import * as userController from '../controllers/usuarios.Controller.js';

const router = express.Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);

export default router;
