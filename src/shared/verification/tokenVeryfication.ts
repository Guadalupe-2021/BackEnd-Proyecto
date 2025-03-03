import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY as string

// Middeware para verificar token del cliente y proteger rutas
export function verificarToken(req:Request,res:Response,next:NextFunction){
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '').trim().replace(/^"|"$/g, '');
        if(!token){
            console.log(token)
            console.log('404 Token no Encontrado')
            res.status(404).json({message:"Token No Encontrado"})
            return
        }
        const decodedToken = jwt.verify(token as string ,SECRET_KEY) as JwtPayload  
        console.log("Token Verificado Exitosamente") //, decodedToken es el administrador
        req.user = decodedToken
        next()
    }
    catch(error){
        res.status(500).json({message:'500 Token Invalido o Expirado'})
        console.log(error)
    }
    
}

export function isSpecialAdmin(req:Request,res:Response,next:NextFunction){
    if(!req.user.especial){
        res.status(401).json({status:401, message:"Acceso no Autorizado"})
        return
    }
    next()

}