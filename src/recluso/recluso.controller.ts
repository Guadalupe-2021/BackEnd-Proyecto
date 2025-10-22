import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Recluso } from "./recluso.entity.js"
import { Condena } from "../condena/condena.entity.js"
import { Actividad } from "../actividad/actividad.entity.js"
import { Collection } from "@mikro-orm/core"

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

async function addReclusoConCondenas(req: Request, res: Response){
    const {reclusoData,condenasData}= req.body
    try{
        const elRecluso = await em.findOne(Recluso,{dni:reclusoData.dni})
    if(elRecluso===null){
        const recluso = em.create(Recluso,reclusoData)
        const condenas = condenasData.map((condenaData: any) => orm.em.create(Condena, { ...condenaData, recluso }));
        recluso.asignarPena(condenas)
        recluso.condenas = condenas
        console.log(condenas)
        await em.persistAndFlush(recluso)
         res.status(201).json({ status: 201, data: recluso.cod_recluso })
        }else{
        res.status(409).json({ status: 409, message: "El Recluso ya existe" })
        }
    } catch (error: any) {
        res.status(500).json({message : error.message})
    }
}

async function putRecluso(req:Request,res:Response){
    try{
        const recluso = await em.findOne(Recluso,{cod_recluso: Number(req.params.id)})
        console.log(recluso)
        if(recluso!=null){
            req.body.dni = req.body.dni.toString()  //parece que en el assign se genra conflicto con el tipo de dato
            em.assign(recluso,req.body)
            await em.flush()
            res.status(200).json({status:200, message:"Recluso Modificado"})
        }
        if(recluso===null)res.status(404).json({sataus:404, message:"ERROR: Recluso no encontrado"})
    }catch{
        res.status(500).json({sataus:500, message:"Error Inesperado"})
    }
}


async function inscripcionActividad(req:Request,res:Response){
    try{
        const recluso = await em.findOne(Recluso,{cod_recluso: Number(req.params.id)})
        const {actividad_data,eliminar}=req.body
        console.log(req.body)
        console.log(actividad_data)
        const actividad = await em.findOne(Actividad,{cod_actividad:actividad_data.cod_actividad})

        if(recluso!=null && actividad!=null){

            if(!eliminar){     
            //@ts-expect-error
            recluso.actividades.add(actividad)  // mikro orm lo ve como una collection y typescript como un array :(
            }else{
            //@ts-expect-error
            recluso.actividades.remove(actividad)  
            }
            await em.flush()
            console.log('actividad_agregada')
            res.status(200).json({status:200, message:"Recluso Inscripto"})
        }
        if(recluso===null)res.status(404).json({sataus:404, message:"ERROR: Recluso no encontrado"})
    }catch(error){
        console.log(error)
        res.status(500).json({sataus:500, message:"Error Inesperado"})
    }
}

async function liberarRecluso(req:Request,res:Response){
    const id = Number(req.params.id)
    try{
        const recluso = await em.findOne(Recluso,{cod_recluso:id})
        console.log("recluso.pena: ",recluso?.pena)
        if(recluso!=null){
            const pena_a_modificar = recluso.pena
            pena_a_modificar.fecha_fin_real = new Date(req.body.pena.fecha_fin_real)
            console.log(pena_a_modificar)
            await em.persistAndFlush(pena_a_modificar)
            console.log("pena modificada y agregada")
            res.status(200).json({status:200, message:"Recluso Liberado"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({sataus:500, message:"Error Inesperado"})
    }
    
}



export { getAll, getSome, getOne, addReclusoConCondenas, sanitizarInputDeRecluso, putRecluso , liberarRecluso,inscripcionActividad}
