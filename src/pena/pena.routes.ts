import { Router } from "express";
import { getAll, add, finalizarPenas } from './pena.controller.js';

export const penaRouter = Router()

penaRouter.get('/', getAll)
penaRouter.post('/', add) // sanitizarInputDeCondena, add)
penaRouter.get('/finalizarPenas', finalizarPenas)

