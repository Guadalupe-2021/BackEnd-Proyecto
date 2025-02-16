import { Router } from "express";
import { getAll, getOne, sanitizarInputDeRecluso, addReclusoConCondenas, putRecluso} from "./recluso.controller.js";

export const reclusoRouter = Router()

reclusoRouter.get('/', getAll)
reclusoRouter.get('/:id', getOne)
reclusoRouter.post('/', addReclusoConCondenas)
reclusoRouter.put('/:id', putRecluso)

