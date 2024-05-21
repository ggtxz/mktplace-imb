import express from "express"
import * as usuarioController from '../Controllers/usuario.controller.js';
import autorizarUsuario from "../MIddlewares/auth.middleware.js";

const router = express.Router();

router.get('/', usuarioController.getUsuarios) //Read
router.post('/', usuarioController.criarUsuario) //Create
router.delete('/:usuarioId', usuarioController.deletarUsuario) //Delete
router.post('/login', usuarioController.login)
router.get('/:usuarioId', autorizarUsuario, usuarioController.getUsuarioPorId)
router.put('/:usuarioId', usuarioController.atualizarUsuario) //Update

export default router;