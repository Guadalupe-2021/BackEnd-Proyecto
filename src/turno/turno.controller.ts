import { Request, Response, NextFunction } from "express"
import { Turno } from './turno.entity.js'
import { orm } from "../shared/db/orm.js"
import { Guardia } from "../guardia/guardia.entity.js";
import { Sector } from "../sector/sector.entity.js";

const em = orm.em

async function getAll(req:Request, res:Response){
    try{
        const turnos = await em.getConnection().execute(`select * from turno t where t.fecha_fin is null;`);
        res.status(201).json({ message: 'los turnos:', data: turnos})
    } catch (error: any) {
        res.status(404).json({ message: 'error'})
    }
}

async function getFromSector(req:Request, res:Response){
    try{
        const cod_sector =  Number.parseInt(req.params.cod_sector)
        const turnos = await em.getConnection().execute(`select * from turno t where t.fecha_fin is null and t.cod_sector_cod_sector = ?;`, [cod_sector]);
        res.status(201).json({ message: 'los turnos:', data: turnos})
    } catch (error: any) {
        res.status(404).json({ message: 'error'})
    }
}

async function add(req:Request, res:Response) {
    try{
        const guardia = await em.findOneOrFail(Guardia,{ cod_guardia:req.body.cod_guardia })
        const sector = await em.findOneOrFail(Sector, {cod_sector: req.body.cod_sector})
        if(guardia != null && sector!=null){
        const turno = {
            fecha:req.body.fecha.split("T")[0],
            tipo_turno:req.body.tipo_turno,
            guardia,
            sector
        }
        em.create(Turno,turno)
        //em.persist(turno) error
        await em.flush()
        res.status(201).json({status:201, message:"Turno Creado"})
    }

    } catch (error: any) {
        console.log(error)
        res.status(404).json({ message: error.message})
    }
}
async function deleteTurno(req:Request, res:Response){
    try{
    const cod_turno = Number(req.params.cod_turno)
    const turno = await em.findOneOrFail(Turno,{cod_turno:cod_turno})
    em.remove(turno)
    await em.flush()
    res.status(200).json({status:200, message: "Turno Eliminado"})
    } catch(e){
    console.log(e)
    res.status(500).json({status:500, message: "Error inesperado"})
    }
}
async function deleteTurnos(req:Request, res:Response){
    try{
    const{fecha,tipo_turno,cod_sector,cod_guardia}= req.params
    const tipo = tipo_turno as 'M' | 'T' | 'N'
    await em.nativeDelete(Turno,{fecha,tipo_turno:tipo,
        guardia: { cod_guardia: Number(cod_guardia) },
        sector: { cod_sector }
    })
    res.status(200).json({status:200, message: "Turno Eliminado"})
    } catch(e){
    console.log(e)
    res.status(500).json({status:500, message: "Error inesperado"})
    }
}


export { getAll, getFromSector, add, deleteTurno, deleteTurnos}

