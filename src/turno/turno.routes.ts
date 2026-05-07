import { Router } from "express";
import { getAll, getFromSector, add, addTurnos, deleteTurno, turnoSanitizer} from "./turno.controller.js";

export const turnoRouter = Router()

turnoRouter.get('/', getAll)
turnoRouter.get('/:cod_sector', getFromSector)
turnoRouter.post('/',turnoSanitizer, add)
turnoRouter.post('/batch', addTurnos)
turnoRouter.delete('/:fecha/:tipo_turno/:cod_sector/:cod_guardia', deleteTurno)

/**
* @swagger
* /turnos:
*   get:
*     tags: [Turno]
*     summary: Get todos los Turnos
*     responses:
*       200:
*         description: Array de Turnos
*         content:
*           application/json:
*             schema:
*                type: array
*                items:
*                 allOf:
*                  - $ref: '#/components/schemas/ApiResponse'
*                  - properties:
*                     data:
*                        $ref: '#/components/schemas/Turno'
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Turnos not found"
*       500:
*         description: "Error Inesperado"
*         content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
* 
*   post:
*     tags: [Turno]
*     summary: Alta turno
*     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Turno'
*     responses:
*       201:
*         description: Turno creado con exito
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ApiResponse'
*             example:
*               status: 201
*               mwssage: 'Turno Creado'
*       500:
*         description: "Error Inesperado"
*         content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
* 
* /turnos/{cod_sector}:
*   get:
*     tags: [Turno]
*     summary: Get Turnos por sector
*     parameters:
*       - in: path
*         name: cod_sector
*         required: true
*         schema:
*           type: string
*         description: Código del sector
*     responses:
*       200:
*         description: Se obtienen todos los turnos del sector
*         content:
*           application/json:
*             schema:
*                type: array
*                items:
*                 allOf:
*                  - $ref: '#/components/schemas/ApiResponse'
*                  - properties:
*                     data:
*                        $ref: '#/components/schemas/Turno'
*       500:
*         description: "Error Inesperado"
*         content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
* 
* /turnos/batch:
*   post:
*     tags: [Turno]
*     summary: Crear turnos en batch. Del dia posterior a la fecha a 2 meses
*     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/TurnosBatch'
*     responses:
*       201:
*         description: Turnos creados
*         content:
*           application/json:
*             schema:
*               allOf:
*                - $ref: '#/components/schemas/ApiResponse'
*                - type: object
*                  properties:
*                   status:
*                     type: integer
*                     example: 201
*                   data:
*                     type: array
*                     items:
*                      $ref: '#/components/schemas/Turno'
*                   message:
*                     type: string
*                     example: 'Se crearon/trajeron los turnos de los guardias'
*       409:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 409
*                message: "Error: guardia no posee un contrato activo"
*       500:
*         description: "Error Inesperado"
*         content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
* 
* /turnos/{fecha}/{tipo_turno}/{cod_sector}/{cod_guardia}:
*   delete:
*     tags: [Turno]
*     summary: Eliminar Turno
*     parameters:
*       - in: path
*         name: fecha
*         required: true
*         schema:
*           type: string
*         description: Fecha del turno a eliminar
*       - in: path
*         name: tipo_turno
*         required: true
*         schema:
*           type: string
*           enum: [M, T, N]
*         description: Tipo del turno a eliminar (M-Mañana,T-Tarde,N-noche)
*       - in: path
*         name: cod_sector
*         required: true
*         schema:
*           type: string
*           maxLength: 2
*         description: Código de sector
*       - in: path
*         name: cod_guardia
*         required: true
*         schema:
*           type: integer
*         description: Código de guardia
*     responses:
*       200:
*         description: Turno eliminado
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ApiResponse'
*             example:
*               status: 200
*               message: "Turno eliminado"
*       500:
*         description: "Error Inesperado"
*         content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
*/