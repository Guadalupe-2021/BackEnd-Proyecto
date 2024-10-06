import { Request, Response, NextFunction } from "express"
import { ActividadIlegal } from "./actividadIlegal.entity.js"
import { Recluso } from "../reclusoDir/recluso.entity.js"
import { orm } from "../shared/db/orm.js"
import { ConstraintViolationException } from "@mikro-orm/core"

const em = orm.em

function sanitizarInputDeActividadIlegal(req : Request, res : Response, next: NextFunction){
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === undefined) {
        delete req.body[key]
      }
    })
    next()
}

async function getAll(req:Request, res:Response){
    try{
        const actividadesIlegales = await em.getConnection().execute(`select * from actividad_ilegal act_il where act_il.estado = 1;`);
        res.status(201).json({ message: 'las actividades ilegales:', data: actividadesIlegales})
    } catch (error: any) {
        res.status(404).json({ message: 'error'})
    }
}

/*
async function getSome(req:Request, res:Response){
    try{
        const talleres = await em.find(Taller, { nombre: '%req.params.nombreParcial%' })  //reveer si recibe params o body segun lo que diga gonza
        res.status(201).json({ message: 'las actividades:', data: actividades})
    } catch (error: any) {
        res.status(404).json({ message: 'error'})
    }
}
*/

async function getOne(req: Request, res: Response){
    try {
        const cod_act_ilegal =  Number.parseInt(req.params.cod_actividad_ilegal)
        const laActIlegal = await em.findOneOrFail(ActividadIlegal, { cod_act_ilegal })
        res.status(201).json({ data: laActIlegal, message: 'actividad ilegal encontrada'} )
    } catch (error: any){
        res.status(404).json({ message: 'no hay actividades ilegales con ese codigo'})
    }
}

async function add(req: Request, res: Response){
    try{
        const si_o_no = await em.getConnection().execute(`select count(*) as cont from actividad_ilegal act_il where act_il.nombre = ?;`, [req.body.nombre]);
        if(si_o_no[0].cont === 0){
            const laActIlegal = em.create(ActividadIlegal, req.body)
            await em.flush()
            res.status(201).json({message: 'actividad ilegal creada', data: laActIlegal})
        }else{
            res.status(409).json({message: 'actividad ilegal ya creada'})
        }
    } catch (error: any) {
        res.status(500).json({message : error.message})
    }
}

async function inscripcion(req: Request, res: Response) {
    try {
        const cod_actividad_ilegal : any[] = [];
        cod_actividad_ilegal[0] = Number(req.params.cod_act_ilegal)
        const actividad_ilegal = await em.getConnection().execute(`select cod_act_ilegal as cod from actividad_ilegal where cod_act_Ilegal = ? and estado = 1`, [cod_actividad_ilegal[0]]);
        const cod_recluso : any[] = [];
        cod_recluso[0] = Number(req.params.cod_recluso)
        const elReclusoVerdadero = await em.findOne(Recluso, cod_recluso[0])
        if(elReclusoVerdadero !== null && actividad_ilegal[0] !== undefined){
            const chequeo = await em.getConnection().execute(`select a_i.cod_act_ilegal, count(a_i_r.recluso_cod_recluso) as cont, cantidad_maxima
                                                                from actividad_ilegal a_i
                                                                left join actividad_ilegal_reclusos a_i_r on a_i_r.actividad_ilegal_cod_act_ilegal = a_i.cod_act_ilegal
                                                                where a_i.cod_act_ilegal = ?
                                                                group by a_i.cod_act_ilegal
                                                                having cantidad_maxima > count(a_i_r.recluso_cod_recluso);`, [cod_actividad_ilegal[0]]);
            if(chequeo[0] !== undefined){
                try{
                    const inscripcion = await em.getConnection().execute(`insert into actividad_ilegal_reclusos(actividad_ilegal_cod_act_ilegal, recluso_cod_recluso) 
                                                                            values (?, ?);`, [cod_actividad_ilegal[0], cod_recluso[0]]);
                }catch (error: any){
                    console.log('error al hacer la inscripcion')
                }
                res.status(200).json({ message: 'inscripcion hecha' })
            } else {
                res.status(409).json({ message: 'no hay mas cupo' })
            }
        }
        if(elReclusoVerdadero === null){
            res.status(404).json({ message: 'recluso no encontrado' })
        }
        if(actividad_ilegal[0] === undefined){
            res.status(404).json({ message: 'actividad ilegal no encontrada' })
        }
    }catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export { getAll, getOne, add, inscripcion }
