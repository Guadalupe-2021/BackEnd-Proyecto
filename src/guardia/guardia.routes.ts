import { Router } from "express";
import { guardia_Service,guardiaSanitizer} from "./guardia.controller.js";
export const guardiaRouter = Router()

guardiaRouter.get('/', guardia_Service.prototype.getAll)
guardiaRouter.get('/:id', guardia_Service.prototype.getOne)
guardiaRouter.post('/',guardiaSanitizer ,guardia_Service.prototype.addOne)
guardiaRouter.put('/:id',guardiaSanitizer ,guardia_Service.prototype.putGuardia)


/**
* @swagger
* /guardias:
*   get:
*     tags: [Guardia]
*     summary: Get all guardias
*     responses:
*       200:
*         description: Array de Guardias
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Guardia'
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Guardia not found"
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
*      tags: [Guardia]
*      summary: Alta guardia
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Guardia'
*      responses:
*       '201':
*          description: Guardia creado
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Guardia'
*       '409':
*          description: ERROR Guardia con ese codigo/dni ya existe
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 409
*                message: "ERROR: El Guardia Ya Existe"
*       '500':
*          description: Error Inesperado
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
* 
* /guardias/{id}:
*   get:
*     tags: [Guardia]
*     summary: Get One Guardia
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: Código del guardia
*     responses:
*       200:
*         description: Un Guardia
*         content:
*           application/json:
*             schema:
*               type: object
*               $ref: '#/components/schemas/Guardia'
*       404:
*          description: "Not Found"
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Guardia not found"
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
*   put:
*      tags: [Guardia]
*      summary: Modificar Guardia
*      parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: Código del guardia
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Guardia'
*      responses:
*       '201':
*          description: Guardia Modificado
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/Guardia'
*       '404':
*          description: Guardia no Encontrado
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 404
*                message: "Not Found"
*       '500':
*          description: Error Inesperado
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/ApiResponse'
*              example:
*                status: 500
*                message: "Error Inesperado"
*/


