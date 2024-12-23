import { Router } from "express";
import { getAll, getOne, sanitizarInputDeRecluso, postOneRecluso} from "./recluso.controller.js";

export const reclusoRouter = Router()

reclusoRouter.get('/', getAll)
reclusoRouter.get('/:id', getOne)
reclusoRouter.post('/', postOneRecluso)

