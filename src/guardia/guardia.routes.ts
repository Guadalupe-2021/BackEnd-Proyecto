import { Router } from "express";
import { guardia_Service,guardiaSanitizer} from "./guardia.controller.js";
export const guardiaRouter = Router()

guardiaRouter.get('/', guardia_Service.prototype.getAll)
guardiaRouter.get('/:id', guardia_Service.prototype.getOne)
guardiaRouter.post('/',guardiaSanitizer ,guardia_Service.prototype.addOne)
guardiaRouter.put('/:id/modificar',guardiaSanitizer ,guardia_Service.prototype.putGuardia)

