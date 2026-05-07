import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Guardia } from "./guardia.entity.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Turno } from "../turno/turno.entity.js"
import { valibot_guardia } from "./guardia.schema.js"

dotenv.config()

const em = orm.em
em.getRepository(Guardia)

async function guardiaSanitizer(req:Request,res:Response,next:NextFunction){
  try{ 
    const incoming = await valibot_guardia(req.body)
    if (!incoming.success){
        console.log("incomming issues: ")
        console.log(incoming.issues)
        return res.status(400).json({status:400, message: incoming.issues[0].message})
    }
    req.body.sanitized_input = incoming.output
    next()

  }catch(error){
    console.log(error)
    return res.status(500).json({status:500, message: "Error Inesperado"})
  }
}


export class guardia_Service {

async getAll(req:Request, res:Response){
    try{
        const guardias = await em.find(Guardia,{})
        if(guardias!==null)res.status(200).json(guardias)
        if(guardias===null)res.status(404).json({status:404, message:"Not Found"})
    } catch (error: any) {
        res.status(500).json({status: 500})
    }
}
async getAllDisponibles(req:Request, res:Response){
    try{
        const fecha = req.params.fecha
        const allGuardias = await em.find(Guardia,{fecha_fin_contrato:null})
        const guardias_ocupados = await em.find(Guardia,{ turnos:{fecha} })

        const id_ocupados = new Set( guardias_ocupados.map((g)=>g.cod_guardia) )
        const guardias = allGuardias.filter((g)=>!id_ocupados.has(g.cod_guardia))
        if(guardias!==null)res.status(200).json(guardias)
        if(guardias===null)res.status(404).json({status:404, message:"Not Found"})
    } catch (error: any) {
        res.status(500).json({status: 500, message:"Error Inesperado"})
    }
}
async getOne(req: Request, res: Response){
    try {
    if(!(req.params.id.indexOf(".")))throw Error
    const id_guardia = Number(req.params.id)
    if((id_guardia % 1 != 0)) throw Error  // error si es decimal

const guardia = (id_guardia>9999999) ? await em.findOne(Guardia, {dni:id_guardia}) : await em.findOne(Guardia, {cod_guardia:id_guardia});
    if(guardia !== null){
            res.status(201).json(guardia)
        }else{
            res.status(404).json({ status: 404 })
        }
    } catch (error: any){
        res.status(500).json({ status: 500, message: error.message})
    }
}

async addOne(req: Request, res: Response){
    try{
        const guardia = await em.findOne(Guardia, {dni:req.body.sanitized_input.dni});
        if(guardia === null){
            em.create(Guardia, req.body.sanitized_input) 
            await em.flush()
            res.status(201).json({ status: 201 })
        } else {
            res.status(409).json({status: 409, message:"ERROR: El Guardia Ya Existe"})
        }
    } catch (error: any) {
        res.status(500).json({message : error.message})
        console.log(error)
    }
}

async putGuardia(req: Request, res: Response){
    try {
    const codGuardia = Number.parseInt(req.params.id)
    const guardia = await em.findOne(Guardia,{cod_guardia: codGuardia})
    if(guardia!=null){
      em.assign(guardia, req.body.sanitized_input)
      await em.flush()
      if(guardia.fecha_fin_contrato){
        await em.nativeDelete(Turno,{
            guardia:guardia,
            fecha: { $gte: guardia.fecha_fin_contrato.toISOString().split("T")[0] }
        })
    }
    res.status(200).json({status:200, message : "Guardia Modificado", data:guardia})
    }else{
        res.status(404).json({status:404, message:'Not Found'})
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
}

export { guardiaSanitizer}



