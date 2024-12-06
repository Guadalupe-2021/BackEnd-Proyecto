import { Router } from "express";
import { getAll, getOne, getCeldas, agregar_sentencia_a_sector, getTurnos } from "./sector.controller.js";

export const sectorRouter = Router()

sectorRouter.get('/', getAll)
sectorRouter.get('/:cod_sector', getOne)
sectorRouter.get('/:cod_sector/celdas', getCeldas)
sectorRouter.get('/:cod_sector/turnos', getTurnos)
sectorRouter.post('/agregarSentenciasEn:cod_sector', agregar_sentencia_a_sector)


