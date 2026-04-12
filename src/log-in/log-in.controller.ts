
import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Administrador } from '../administrador/administrador.entity.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { LogInSchema } from "./login.schema.js"
import * as v from "valibot"
dotenv.config()

function input_sanitizer(req: Request, res:Response, next:NextFunction){
    try{
        v.parse(LogInSchema, req.body)
    }catch (e){
        console.log(e)
          if (v.isValiError<typeof LogInSchema>(e)) {
         console.log(e.issues);
         res.status(401).json({status:401, message:"Error de Schema"})
         return
  }
    }
    next()
}




function generateToken(userData:Administrador){
    return jwt.sign(userData,process.env.SECRET_KEY as string) 
}

const em = orm.em
em.getRepository(Administrador)
async function logIn(req: Request, res: Response){
    // SE GENERA EL TOKEN Y E ENVIA AL CLIENTE
    try {
        const [nombre,codigo] = req.body.user_name.split("_")
        const cod_administrador = Number.parseInt( codigo ) 
        const administrador = await em.findOneOrFail(Administrador, { cod_administrador })
    if(administrador.nombre!==nombre) return res.status(401).json({ status: 401, message: "Nombre de usuario incorrecto"} )
        const jwtToken = generateToken(Object.assign({},administrador))
        if(administrador.contrasenia === req.body.password){
            res.status(202).json(
              { 
                status: 202,
                data:{ nombre:administrador.nombre,
                       especial:administrador.especial } ,
                token: jwtToken
              } )
        } else {
            res.status(401).json({ status: 401, message: "Contraseña incorrecta"} )
        }
    } catch (error: any){
        res.status(404).json({ status: 404, message: "Usuario no encontrado"} )
    }
}
export { logIn, generateToken, input_sanitizer }