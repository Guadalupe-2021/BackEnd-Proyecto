import { Router } from "express";
import { getAll, getFromSector, add, deleteTurno, deleteTurnos } from "./turno.controller.js";

export const turnoRouter = Router()

turnoRouter.get('/', getAll)
turnoRouter.get('/:cod_sector', getFromSector)
//fecha:string,tipo_turno:string,cod_sector:string,cod_guardia:number
turnoRouter.post('/', add)
turnoRouter.delete('/:cod_turno', deleteTurno)
turnoRouter.delete('/:fecha/:tipo_turno/:cod_sector/:cod_guardia', deleteTurnos)




