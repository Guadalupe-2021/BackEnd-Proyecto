import { Router } from "express";
import { getAll, getOne, addOne, putGuardia,guardiaSanitizer,verificarToken} from "./guardia.controller.js";

export const guardiaRouter = Router()

guardiaRouter.get('/',verificarToken, getAll)
guardiaRouter.get('/:id', getOne)
guardiaRouter.post('/',guardiaSanitizer ,addOne)
guardiaRouter.put('/:id/modificar',guardiaSanitizer ,putGuardia)

