import express from "express"
import * as imgController from '../Controllers/img.controller.js';
import autorizarUsuario from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/upload.middleware.js";

const router = express.Router();

router.post('/', upload.array("files", 20) ,imgController.criarImg) //Create
router.get('/', imgController.getImgs) //Read
router.get('/:imgId', imgController.getImgPorId) //Read
router.put('/:imgId', imgController.atualizarImg) //Update
router.delete('/:imgId', imgController.deletarImg) //Delete
router.get('/imovel/:imovelId', imgController.getImgPorImovel) //Read

export default router;