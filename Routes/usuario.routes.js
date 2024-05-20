import express from "express"
import * as usuarioController from '../Controllers/usuario.controller.js';

const router = express.Router();

router.get('/', usuarioController.getUsuarios)
router.post('/', usuarioController.criarUsuario)
router.delete('/:usuarioId', usuarioController.deletarUsuario)

export default router;