import { Router } from "express";
import { getAll, getOne,inscripcionActividad, sanitizarInputDeRecluso, addReclusoConCondenas, putRecluso,liberarRecluso} from "./recluso.controller.js";
import { isSpecialAdmin } from "../shared/verification/tokenVeryfication.js";

export const reclusoRouter = Router()

reclusoRouter.get('/', getAll)
reclusoRouter.get('/:id', getOne)
reclusoRouter.post('/', addReclusoConCondenas)
reclusoRouter.put('/:id', putRecluso)
reclusoRouter.put('/:id/inscripcion', inscripcionActividad)
reclusoRouter.put('/:id/liberar', isSpecialAdmin,liberarRecluso)

