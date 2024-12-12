import { Router } from "express";
import { getAll, getOne, add, finalizarContrato,putGuardia} from "./guardia.controller.js";

export const guardiaRouter = Router()

guardiaRouter.get('/', getAll)
guardiaRouter.get('/:id', getOne)
guardiaRouter.post('/', add)
guardiaRouter.post('/id:/modificar', putGuardia)
guardiaRouter.put('/finalizarContrato', finalizarContrato)

