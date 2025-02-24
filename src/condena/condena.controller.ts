import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Condena } from "./condena.entity.js"

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
 
async function getSome(req : Request, res : Response){
    try{
        const condenas = await em.find(Condena, { nombre: '%req.params.nombreParcial%'})
        res.status(201).json({ data: condenas })
    } catch (error: any) {
        res.status(404).json({ message: 'error'})
    }
}

async function getOne(req: Request, res: Response){
    try {
        const cod_condena =  Number.parseInt(req.params.cod_condena) //
        const laCondena = await em.findOne(Condena, { cod_condena })
        res.status(201).json({ data: laCondena} )
    } catch (error: any){
        res.status(500).json({ message: 'error'})
    }
}

async function add(req: Request, res: Response){
    try{
        const condena_con_mismo_orden_gravedad = await em.getConnection().execute(`select count(*) as cont from condena s where s.orden_de_gravedad = ? or s.nombre = ?;`, [req.body.sanitizedInput.orden_de_gravedad, req.body.sanitizedInput.nombre]);
        console.log('antes del if')
        if(condena_con_mismo_orden_gravedad[0].cont === 0){
            const laCondena = em.create(Condena, req.body.sanitizedInput)
            await em.flush()
            res.status(201).json({message: 'condena creada'})
        } else {
            res.status(409).json({message: 'orden de gravedad concuerda con uno ya en existencia.'})
        }
    } catch (error: any) {
        res.status(500).json({message : error}) 
    }
}

async function modificar(req: Request, res: Response) {
    try{
        console.log("hellos")
        const cod_condena = Number(req.params.cod_condena)
        const laCondena = await em.findOne(Condena, { cod_condena:cod_condena })
        console.log(laCondena)
        if(laCondena !== null){
            laCondena.modificarPena(req.body)
            em.assign(laCondena,req.body)
            await em.flush()
            console.log(laCondena)
            res.status(200).json({message: "Condena Modificada"})
        } else {
            res.status(404).json({message: 'condena no encontrada'})
        }
    } catch (error: any) {
        res.status(500).json({message : error})
    }
}

export { getAll, getSome, getOne, add, modificar, sanitizarInputDeCondena }
