import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Condena } from "./condena.entity.js"

const em = orm.em
em.getRepository(Condena)

function sanitizarInputDeCondena(req : Request, res : Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion, 
        duracion_anios: req.body.duracion_anios,
        duracion_meses: req.body.duracion_meses,
        duracion_dias: req.body.duracion_dias,
        orden_de_gravedad: req.body.orden_de_gravedad
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function getAll(req : Request, res : Response){
    try{
        const condenas = await em.find(Condena,{})                         
        if(condenas!==null)res.status(201).json(condenas)
        if(condenas===null)res.status(404).json({ status: 404,message: "Not Found"})
    } catch (error: any) {
        res.status(500).json({ status: 500,message: 'Error Fatal'})
    }
}
 
async function getSome(req : Request, res : Response){
    try{
        const condenas = await em.find(Condena, { nombre: '%req.params.nombreParcial%'})
        res.status(201).json({ data: condenas })
    } catch (error: any) {
        res.status(404).json({ message: 'error'})
    }
}

async function getOne(req: Request, res: Response){
    try {
        const cod_condena =  Number.parseInt(req.params.cod_condena) //
        const laCondena = await em.findOne(Condena, { cod_condena })
        res.status(201).json({ data: laCondena} )
    } catch (error: any){
        res.status(500).json({ message: 'error'})
    }
}

async function add(req: Request, res: Response){
    try{
        const condena_con_mismo_orden_gravedad = await em.getConnection().execute(`select count(*) as cont from condena s where s.orden_de_gravedad = ? or s.nombre = ?;`, [req.body.sanitizedInput.orden_de_gravedad, req.body.sanitizedInput.nombre]);
        console.log('antes del if')
        if(condena_con_mismo_orden_gravedad[0].cont === 0){
            const laCondena = em.create(Condena, req.body.sanitizedInput)
            await em.flush()
            res.status(201).json({message: 'condena creada'})
        } else {
            res.status(409).json({message: 'orden de gravedad concuerda con uno ya en existencia.'})
        }
    } catch (error: any) {
        res.status(500).json({message : error}) 
    }
}

async function deleteOne(req: Request, res: Response) {
    try{
        const cod_condena : any[] = [];
        cod_condena[0] = Number(req.params.cod_condena)
        const laCondena = await em.findOne(Condena, { cod_condena })
        if(laCondena !== null){
            const penas_con_condenas = await em.getConnection().execute(`select count(c_s.pena_cod_recluso_cod_recluso) as cont
                                                                                from codena s
                                                                                inner join pena_condena c_s on c_s.condena_cod_condena = ? and s.cod_condena = ?
                                                                                inner join pena c on c_s.pena_fecha_ini = c.fecha_ini and c_s.pena_cod_recluso_cod_recluso = c.cod_recluso_cod_recluso
                                                                                where c.fecha_fin_real is null;`, [cod_condena[0]]);
            if(penas_con_condenas[0].cont > 0){
                const condenaParaBorrar = em.getReference(Condena, cod_condena[0])
                await em.removeAndFlush(condenaParaBorrar)
                res.status(200).json({message: 'condena eliminada'})
            } else {
                res.status(409).json({message : 'penas activas con esa ccondena'})
            }
        } else {
            res.status(404).json({message: 'condena no encontrada'})
        }
    } catch (error: any) {
        res.status(500).json({message : error})
    }
}

export { getAll, getSome, getOne, add, deleteOne, sanitizarInputDeCondena }
