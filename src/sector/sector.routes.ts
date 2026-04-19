import { Router } from "express";
import { getAll, getOne, getCeldas,add, modificar, deleteOne, getSectoresXTurnoByDate } from "./sector.controller.js";

export const sectorRouter = Router()

sectorRouter.get('/', getAll)
sectorRouter.post('/', add)
sectorRouter.post('/:cod_sector', modificar)
sectorRouter.get('/:fecha', getSectoresXTurnoByDate)
sectorRouter.get('/:cod_sector', getOne)
sectorRouter.get('/:cod_sector/celdas', getCeldas)
sectorRouter.delete('/:cod_sector', deleteOne)


