import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Recluso } from "./recluso.entity.js"
import { Condena } from "../condenaDir/condena.entity.js"

const em = orm.em
em.getRepository(Recluso)

function sanitizarInputDeRecluso(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        fecha_nac: req.body.fecha_nac
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function getAll(req:Request, res:Response){
    try{
        const reclusos = await em.find(Recluso, {})
        res.status(201).json(reclusos)
    } catch (error: any) {
        res.status(404).json({ status: 404 })
    }
}

async function getSome(req : Request, res : Response){
    try{
        const reclusos = await em.find(Recluso, { nombre: '%req.params.nombreParcial%'})
        res.status(201).json({ status: 201, data: reclusos })
    } catch (error: any) {
        res.status(404).json({ status: 404})
    }
}

async function getOne(req: Request, res: Response){
    try {
    if(!(req.params.id.indexOf(".")))throw Error
    const id_recluso = Number(req.params.id)
    if((id_recluso % 1 != 0)) throw Error  // error si es decimal
    const recluso = (id_recluso>9999999) ? await em.findOne(Recluso, {dni:id_recluso}) : await em.findOne(Recluso, {cod_recluso:id_recluso});
    if(recluso !== null){
            res.status(201).json(recluso)
        }else{
            res.status(404).json({ status: 404 })
        }
    } catch (error: any){
        res.status(500).json({ status: 500, message: error.message})
    }
}

async function postOneRecluso(req: Request, res: Response){
    try{
        const recluso = await em.find(Recluso,{dni:req.body.dni})
        if(recluso===null){
           // const elRecluso = await em.create(Recluso, req.body)
           // await em.flush()
           // res.status(201).json({ status: 201, data: elRecluso.cod_recluso })
        }else{
            const condena_si_o_no = await em.getConnection().execute(`select count(*) cont 
                                                                    from condena c
                                                                    inner join recluso r on c.cod_recluso_cod_recluso = r.cod_recluso
                                                                    where dni = ? and c.fecha_fin_real is null;`, [req.body.dni]);
            
            const condenas = await em.find(Condena,{cod_recluso:req.body.cod_recluso,fecha_fin_real:null})                                                            
            if(condenas != null){
                res.status(201).json({  status: 202, data: recluso})
            } else {
                res.status(201).json({  status: 203, data: recluso})
            }
        }
    } catch (error: any) {
        res.status(500).json({message : error.message})
    }
}

export { getAll, getSome, getOne, postOneRecluso, sanitizarInputDeRecluso }
