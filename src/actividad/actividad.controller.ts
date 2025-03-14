import { Request, Response, NextFunction } from "express"
import { Actividad } from "./actividad.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

function sanitizarInputDeActividad(req : Request, res : Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        locacion: req.body.locacion,
        dia_de_la_semana: req.body.dia_de_la_semana,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin,
        estado: req.body.estado,
        /*
        cantidad_minima: req.body.cantidad_minima,
        edad_minima: req.body.edad_minima,                     estos atributos no se pueden cambiar una vez declarados
        cod_sector_cod_sector: req.body.cod_sector_cod_sector
        */
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (req.body[key] === undefined) {
        delete req.body[key]
      }
    })
    next()
}

async function getAll(req:Request, res:Response){
    try{
        const actividades = await em.find(Actividad, {});
        res.status(201).json(actividades)
    } catch (error: any) {
        res.status(404).json({ status: 404})
    }
}

async function getOne(req: Request, res: Response){
    try {
        const cod_actividad =  Number.parseInt(req.params.cod_actividad)
        //const laActividad = await em.findOneOrFail(Actividad, { cod_actividad }, {populate: ['reclusos']})
        const laActividad = 0
        res.status(201).json(laActividad)
    } catch (error: any){
        res.status(404).json({ data: '0'})
    }
}

async function add(req: Request, res: Response){
    try{
        const cant_act_per_day = await em.count(Actividad,{dia_de_la_semana: req.body.dia_de_la_semana})
        if(cant_act_per_day>=3){
       return res.status(409).json({status:409 ,message:'Excede la Cantidad Maxima de Actividades por Dia'})
        }
        em.create(Actividad,req.body)
        await em.flush()
        res.status(201).json({status:201,message:'Actividad Creada'})
    } catch (error: any) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
}

async function update(req: Request, res: Response) {
    try{
        const id_actividad = Number(req.params.cod_actividad)
        const actividad = await em.findOne(Actividad, {cod_actividad:id_actividad})
        if(actividad!=null) {
            em.assign(actividad, req.body)
            await em.flush()
            res.status(200).json({ message: 'Actividad Modificada'})
        } else {
            res.status(404).json({message:'Actividad No Encontrada'})
            return
        }
    } catch (error: any) {
        res.status(500).json({ message : error.message })
    }
}

async function deleteOne(req:Request,res:Response){
    try{
        const cod_act = Number(req.params.cod_actividad)
        const actividad = await em.findOne(Actividad,{cod_actividad:cod_act})
        //em.remove(actividad)
        //await em.flush()
        if(actividad!=null){
         await em.removeAndFlush(actividad)
        res.status(200).json({message:'Acividad Eliminada'})    
        }else{
            res.status(404).json({message:'Actividad a Eliminar no Encontrada'})
            return
        }

    }catch(error:any){
        res.status(500).json({message:error.message})
    }
}


export { getAll, getOne, add, update, sanitizarInputDeActividad,deleteOne }









