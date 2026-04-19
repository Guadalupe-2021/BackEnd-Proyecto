import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Sector } from "./sector.entity.js"

const em = orm.em
em.getRepository(Sector)

async function getAll(req:Request, res:Response){
    try{
        const sectores = await em.find(Sector, {})
        res.status(201).json(sectores)
    } catch (e:any) {
        res.status(404).json({ status: 404, message:e.error})
    }
}

async function getSectoresXTurnoByDate(req:Request,res:Response){
    try{
        const sectores = await em
        .createQueryBuilder(Sector, 's')
        .leftJoinAndSelect(
            's.turnos', 't',{ fecha: req.params.fecha } )
        .leftJoinAndSelect('t.guardia', 'g')
        .getResult();
        res.status(201).json(sectores)
    }catch(e){
        console.log(e)
        res.status(500).json({ status: 500, message:e})
    }
}

async function add(req : Request, res : Response){
    try{
        const sector_duplicado = await em.findOne(Sector,req.body.cod_sector.toUpperCase())
        if(sector_duplicado!=null){
            res.status(409).json({status:409,
                message:"Error. Ya existe sector con codigo seleccionado"})
            return}
        req.body.cod_sector = req.body.cod_sector.toUpperCase()
        const sector = em.create(Sector,req.body)
        await em.persist(sector).flush();
        res.status(201).json({status:200, message:"Sector Guardado"})
    }catch(error:any){
        res.status(500).json({status:500, message:"Error inesperado. No se ha podido guardar el sector"})
    }
}
async function getSome(req : Request, res : Response){
    try{
        const sectores = await em.find(Sector, { nombre: '%req.params.nombreParcial%'})
        res.status(201).json({ status: 201, data: sectores })
    } catch (error: any) {
        res.status(404).json({ status: 201})
    }
}

async function getOne(req: Request, res: Response){
    try {
        const cod_sector =  req.params.cod_sector
        const elSector = await em.findOneOrFail(Sector, { cod_sector })
        res.status(201).json({ status: 201, data: elSector } )
    } catch (error: any){
        res.status(404).json({status: 404})
    }
}

async function getCeldas(req: Request, res: Response){
    try {
        const cod_sector =  Number.parseInt(req.params.cod_sector) 
        //const lasCeldas:string = await em.getConnection().execute(`
        //    select *
        //    from celda
        //    where cod_sector_cod_sector = ?;`, [cod_sector])
        //res.status(201).json({ status: 201, data: lasCeldas} )
    } catch (error: any){
        res.status(404).json({status: 404 })
    }
}

async function modificar(req:Request,res:Response){
    try{
        const sector = await em.findOne(Sector,{cod_sector: req.params.cod_sector.toUpperCase()})
        if(sector!=null){
            em.assign(sector,req.body)
            await em.flush()
            res.status(200).json({status:200, message:"Sector Modificado"})
        }
        if(sector===null)res.status(404).json({sataus:404, message:"ERROR: Sector no encontrado"})
    }catch{
        res.status(500).json({sataus:500, message:"Error Inesperado"})
    }
}



async function deleteOne(req:Request, res:Response){
    try{
        const cod_sector = req.params.cod_sector
        await em.nativeDelete(Sector,{cod_sector})
        res.status(200).json({status:200, message:"Sector Eliminado"})
    }catch(e){
        console.log(e)
        res.status(500).json({status:500, message:"Error Inesperado"})
    }
}



export { getAll, getSome, getOne, getCeldas, deleteOne, add, modificar, getSectoresXTurnoByDate }
