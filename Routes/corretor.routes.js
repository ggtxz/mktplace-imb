import express from "express"
import * as corretorController from '../Controllers/corretor.controller.js';
import autorizarUsuario from "../Middlewares/auth.middleware.js";


const router = express.Router();

router.post('/', corretorController.criarcorretor) //Create
router.get('/', corretorController.getCorretores) //Read
router.get('/:corretorId', corretorController.getCorretorPorId) //Read
router.put('/:corretorId', autorizarUsuario, corretorController.atualizarCorretor) //Update
router.delete('/:corretorId', corretorController.deletarCorretor) //Delete

export default router;