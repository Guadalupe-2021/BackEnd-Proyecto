import { Router } from "express";
import { getAll, getOne, update, add, sanitizarInputDeActividad,deleteOne } from "./actividad.controller.js";

export const actividadRouter = Router()

actividadRouter.get('/', getAll)
actividadRouter.get('/:cod_actividad', getOne)
actividadRouter.delete('/:cod_actividad', deleteOne)
actividadRouter.post('/',sanitizarInputDeActividad ,add)
actividadRouter.put('/:cod_actividad', sanitizarInputDeActividad, update)


/**
* @swagger
* /activiades:
*   get:
*     tags: [Actividad]
*     summary: Get todas las actividades
*     responses:
*       200:
*         description: Array de Actividades
*         content:
*           application/json:
*             schema:
*                allOf:
*                  - $ref: '#/components/schemas/ApiResponse'
*                  - properties:
*                     data:
*                        $ref: '#/components/schemas/Actividad'
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Actividad not found"
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
*     tags: [Actividad]
*     summary: Alta actividad
*     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ActividadBase'
*     responses:
*       201:
*         description: Array de Actividades
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ApiResponse'
*             example:
*               status: 201
*               mwssage: 'Actividad Creada'
*       409:
*          description: "Cnflicto cant actividades exceda maximo diario"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 409
*                message: "Excede la Cantidad Maxima de Actividades por Dia"
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
* /actividades/{cod_actividad}:
*   get:
*     tags: [Actividad]
*     summary: Get Actividad
*     parameters:
*       - in: path
*         name: cod_actividad
*         required: true
*         schema:
*           type: integer
*         description: Código de la actividad
*     responses:
*       200:
*         description: Una Actividad
*         content:
*           application/json:
*             schema:
*              allOf:
*                 - $ref: '#/components/schemas/ApiResponse'
*                 - properties:
*                     data:
*                      allOf:
*                       - $ref: '#/components/schemas/Actividad'
*                       - properties:
*                           reclusos:
*                             type: array
*                             items:
*                               $ref: '#/components/schemas/Recluso'
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Actividad not found"
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
*   delete:
*     tags: [Actividad]
*     summary: Borrar actividad
*     parameters:
*       - in: path
*         name: cod_actividad
*         required: true
*         schema:
*           type: integer
*         description: Código de la actividad
*     responses:
*       200:
*         description: Actividad eliminada
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ApiResponse'
*             example:
*               status: 200
*               message: "Actividad eliminada"
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Actividad a Eliminar no Encontrada"
*       500:
*         description: "Error Inesperado"
*         content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
*   put:
*     tags: [Actividad]
*     summary: Modificar actividad
*     parameters:
*       - in: path
*         name: cod_actividad
*         required: true
*         schema:
*           type: integer
*         description: Código de la actividad
*     requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/ActividadBase'
*     responses:
*       200:
*         description: Actividad modificada con exito
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/ApiResponse'
*             example:
*               status: 200
*               message: "Actividad Modificada"
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Actividad No Encontrada"
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