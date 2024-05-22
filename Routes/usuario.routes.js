import express from "express"
import * as usuarioController from '../Controllers/usuario.controller.js';
import autorizarUsuario from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', usuarioController.criarUsuario) //Create
router.get('/', usuarioController.getUsuarios) //Read
router.get('/:usuarioId', usuarioController.getUsuarioPorId) //Read
router.put('/:usuarioId', autorizarUsuario, usuarioController.atualizarUsuario) //Update
router.delete('/:usuarioId', usuarioController.deletarUsuario) //Delete
router.post('/login', usuarioController.login)

export default router;