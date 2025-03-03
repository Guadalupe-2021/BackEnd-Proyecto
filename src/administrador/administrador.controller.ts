import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Administrador } from "./administrador.entity.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function generateToken(userData:Administrador){
    return jwt.sign(userData,process.env.SECRET_KEY as string) 
}

const em = orm.em
em.getRepository(Administrador)

function sanitizarInputDeAdministrador(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        fechaIniContrato: req.body.fechaIniContrato,
        fechaFinContrato: req.body.fechaFinContrato,
        contrasenia: req.body.contrasenia
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function logIn(req: Request, res: Response){
    // SE GENERA EL TOKEN Y E ENVIA AL CLIENTE
    try {
        const cod_administrador = Number.parseInt(req.body.cod_administrador) 
        const elAdmin = await em.findOneOrFail(Administrador, { cod_administrador })
        const jwtToken = generateToken(Object.assign({},elAdmin))
        if(elAdmin.contrasenia === req.body.contrasenia){
            res.status(202).json({ status: 202,
                data:{nombre:elAdmin.nombre,especial:elAdmin.especial} ,
                token: jwtToken} )
        } else {
            res.status(401).json({ status: 401} )
        }
    } catch (error: any){
        res.status(404).json({ status: 404 } )
    }
}

async function getAll(req:Request, res:Response){
    try{
        const administradores = await em.getConnection().execute(`select * from administrador admin where admin.fecha_fin_contrato is null;`);
        res.status(201).json({ status: 201, data: administradores})
    } catch (error: any) {
        res.status(404).json({  status: 404})
    }
}

async function getOne(req: Request, res: Response){
    try {
        console.log(req.params.cod_administrador)
        const cod_administrador =  Number.parseInt(req.params.cod_administrador) 
        const elGuardia = await em.findOne(Administrador, { cod_administrador })
        res.status(201).json({  status: 201, data: elGuardia } )
    } catch (error: any){
        res.status(500).json({ message: error.message})
    }
}






export { getAll, getOne, logIn, sanitizarInputDeAdministrador,generateToken }
