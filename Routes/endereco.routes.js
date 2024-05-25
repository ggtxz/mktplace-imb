import express from "express"
import * as enderecoController from '../Controllers/endereco.controller.js';
import autorizarUsuario from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', enderecoController.criarEndereco) //Create
router.get('/', enderecoController.getEnderecos) //Read
router.get('/:enderecoId', enderecoController.getEnderecoPorId) //Read
router.put('/:enderecoId', enderecoController.atualizarEndereco) //Update
router.delete('/:enderecoId', enderecoController.deletarEndereco) //Delete

export default router;