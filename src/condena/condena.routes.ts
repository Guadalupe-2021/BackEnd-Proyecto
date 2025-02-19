import { Router } from "express";
import { getAll, getOne, add, modificar, sanitizarInputDeCondena } from "./condena.controller.js";

export const condenaRouter = Router()

condenaRouter.get('/', getAll)
condenaRouter.get('/:cod_condena', getOne)
condenaRouter.post('/', sanitizarInputDeCondena, add)
condenaRouter.put('/:cod_condena', modificar)


