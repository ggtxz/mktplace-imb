import express from "express"
import * as imoveisController from '../Controllers/imovel.controller.js';
import autorizarUsuario from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post('/', imoveisController.criarImovel) //Create
router.get('/', imoveisController.getImoveis) //Read
router.get('/:imovelId', imoveisController.getImovelPorId) //Read
router.put('/:imovelId', imoveisController.atualizarImovel) //Update
router.delete('/:imovelId', imoveisController.deletarImovel) //Delete

export default router;