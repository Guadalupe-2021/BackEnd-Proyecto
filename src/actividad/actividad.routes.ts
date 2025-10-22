import { Router } from "express";
import { getAll, getOne, update, add, inscribir, sanitizarInputDeActividad,deleteOne } from "./actividad.controller.js";

export const actividadRouter = Router()

actividadRouter.get('/', getAll)
actividadRouter.get('/:cod_actividad', getOne)
actividadRouter.delete('/:cod_actividad', deleteOne)
actividadRouter.post('/', add) // sanitizarInputDeActividad, add)
actividadRouter.put('/:cod_actividad', sanitizarInputDeActividad, update)
actividadRouter.put('/:cod_actividad/inscripcion', sanitizarInputDeActividad, update)



