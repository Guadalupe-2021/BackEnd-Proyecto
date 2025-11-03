import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Guardia } from "./guardia.entity.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { EntityManager } from "@mikro-orm/mysql"

dotenv.config()

// const em = orm.em
// em.getRepository(Guardia)

async function guardiaSanitizer(req:Request,res:Response,next:NextFunction){
    console.log("en el guardia sanitizer",req.body)
    try{
req.body.sanitizedInputGuardia = {
     nombre: req.body.nombre,
     apellido: req.body.apellido,
     dni: req.body.dni,
     fecha_ini_contrato: new Date(req.body.fecha_ini_contrato),
     fecha_fin_contrato: new Date(req.body.fecha_fin_contrato),
     }
    console.log("guardia sanitizer realizado con exito",req.body.sanitizedInputGuardia)
     
    //more checks here
     //Number(req.body.dni)
     //new Date(req.body.fecha_ini_contrato)
     //new Date(req.body.fecha_fin_contrato)


  //Object.keys(req.body.sanitizedInput).forEach((key) => {
  //  if (req.body.sanitizedInput[key] === undefined) {
  //    delete req.body.sanitizedInput[key]
  //  }
  //})
  }catch(error){
    console.log(error)
  }
  next()
}


export class guardia_Service {
constructor(private em: EntityManager) {this.em.getRepository(Guardia)}

async getAll(req:Request, res:Response){
    try{
        const guardias = await this.em.find(Guardia,{})
        if(guardias!==null)res.status(200).json(guardias)
        if(guardias===null)res.status(404).json({status:404, message:"Not Found"})
    } catch (error: any) {
        res.status(500).json({status: 500})
    }
}

async getOne(req: Request, res: Response){
    try {
    if(!(req.params.id.indexOf(".")))throw Error
    const id_guardia = Number(req.params.id)
    if((id_guardia % 1 != 0)) throw Error  // error si es decimal

const guardia = (id_guardia>9999999) ? await this.em.findOne(Guardia, {dni:id_guardia}) : await this.em.findOne(Guardia, {cod_guardia:id_guardia});
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
        const guardia = await this.em.findOne(Guardia, {dni:req.body.dni});
        if(guardia === null){
            this.em.create(Guardia, req.body.sanitizedInputGuardia) 
            await this.em.flush()
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
    //const codGuardia = req.body.cod_guardia
    console.log('Look For Guardia')
    const guardia = await this.em.findOne(Guardia,{cod_guardia: codGuardia})
    if(guardia!=null){
    this.em.assign(guardia, req.body)
    await this.em.flush()
    console.log('guardia modificado')
    res.status(200).json({status:200, message : "Guardia Modificado", data:guardia})
    }else{
    console.log('guardia no encontrado')

        res.status(404).json({status:404, message:'Not Found'})
    }
  } catch (error: any) {
    console.log('error inesperado')

    res.status(500).json({ message: error.message })
  }
}
}

export { guardiaSanitizer}



