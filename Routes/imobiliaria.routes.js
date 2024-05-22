import express from "express"
import * as imobiliariaController from '../Controllers/imobiliaria.controller.js';
import autorizarUsuario from "../Middlewares/auth.middleware.js";


const router = express.Router();

router.post('/', imobiliariaController.criarImobiliaria) //Create
router.get('/', imobiliariaController.getImobiliarias) //Read
router.get('/:imobiliariaId', imobiliariaController.getImobiliariaPorId) //Read
router.put('/:imobiliariaId', imobiliariaController.atualizarImobiliaria) //Update
router.delete('/:imobiliariaId', imobiliariaController.deletarImobiliaria) //Delete

export default router;