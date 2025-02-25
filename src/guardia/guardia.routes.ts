import { Router } from "express";
import { getAll, getOne, addOne, putGuardia,guardiaSanitizer} from "./guardia.controller.js";
export const guardiaRouter = Router()

guardiaRouter.get('/', getAll)
guardiaRouter.get('/:id', getOne)
guardiaRouter.post('/',guardiaSanitizer ,addOne)
guardiaRouter.put('/:id/modificar',guardiaSanitizer ,putGuardia)

