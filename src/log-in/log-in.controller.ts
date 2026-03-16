
import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Administrador } from '../administrador/administrador.entity.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()



function generateToken(userData:Administrador){
    return jwt.sign(userData,process.env.SECRET_KEY as string) 
}

const em = orm.em
em.getRepository(Administrador)
async function logIn(req: Request, res: Response){
    // SE GENERA EL TOKEN Y E ENVIA AL CLIENTE
    try {
        const cod_administrador = Number.parseInt(req.body.cod_administrador) 
        const elAdmin = await em.findOneOrFail(Administrador, { cod_administrador })
        const jwtToken = generateToken(Object.assign({},elAdmin))
        console.log(jwtToken)
        if(elAdmin.contrasenia === req.body.contrasenia){
            res.status(202).json(
              { 
                status: 202,
                data:{ nombre:elAdmin.nombre,
                       especial:elAdmin.especial } ,
                token: jwtToken
              } )
        } else {
            res.status(401).json({ status: 401, message: "Contraseña incorrecta"} )
        }
    } catch (error: any){
        res.status(404).json({ status: 404, message: "Usuario no encontrado"} )
    }
}
export { logIn, generateToken }