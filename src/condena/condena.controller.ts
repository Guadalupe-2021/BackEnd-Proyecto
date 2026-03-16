import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Condena } from "./condena.entity.js"
import { Pena } from "../pena/pena.entity.js"

const em = orm.em
em.getRepository(Condena)

function sanitizarInputDeCondena(req : Request, res : Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion, 
        duracion_anios: req.body.duracion_anios,
        duracion_meses: req.body.duracion_meses,
        duracion_dias: req.body.duracion_dias,
        orden_de_gravedad: req.body.orden_de_gravedad
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function getAll(req : Request, res : Response){
    try{
        const condenas = await em.find(Condena,{})                         
        if(condenas!==null)res.status(201).json(condenas)
        if(condenas===null)res.status(404).json({ status: 404,message: "Not Found"})
    } catch (error: any) {
        res.status(500).json({ status: 500,message: 'Error Fatal'})
    }
}
 

async function getOne(req: Request, res: Response){
    try {
        const cod_condena =  Number.parseInt(req.params.cod_condena) //
        const condena = await em.findOne(Condena, { cod_condena })
        res.status(201).json({ data: condena} )
    } catch (error: any){
        res.status(500).json({ message: 'error'})
    }
}

async function add(req: Request, res: Response){
    try{
        em.create(Condena, req.body)
        await em.flush()
        res.status(201).json({status:201, message: 'Condena Creada'})
    } catch (error: any) {
        res.status(500).json({status:500, message : error}) 
    }
}

async function modificar(req: Request, res: Response) {
    try{
        const cod_condena = Number(req.params.cod_condena)
        const condena = await em.findOne(Condena,
             { cod_condena:cod_condena },{ populate: ['pena'] } )
        if(condena !== null && condena.pena !== undefined){
            const pena = condena.pena
            condena.modificarPena(req.body,pena.fecha_fin_estimada)
            em.assign(condena,req.body)
            await em.flush()
            res.status(200).json({message: "Condena Modificada"})
        } else {
            res.status(404).json({message: 'condena no encontrada'})
        }
    } catch (error: any) {
        res.status(500).json({message : error})
    }
}

export { getAll, getOne, add, modificar, sanitizarInputDeCondena }
