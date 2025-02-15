import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Pena } from "./pena.entity.js"

const em = orm.em
em.getRepository(Pena)

async function getAll(req:Request, res:Response){
    try{
        const penas = await em.find(Pena, {})
        res.status(201).json({ message: 'las Penas:', data: penas})
    } catch (error: any) {
        res.status(404).json({ message: 'error get all'})
    }
}

async function add(req: Request, res: Response){
    try{
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        let year = today.getFullYear();
        let finalDate = `${year}-${month}-${day}`
        console.log(req.body)
        let auc = await em.getConnection().execute(`insert into pena (cod_recluso_cod_recluso, fecha_ini, fecha_fin_estimada, fecha_fin_real) 
                                                    values (?, ?, ?, ?);`, [req.body.cod_recluso, finalDate, null, null]);
        await em.flush()

        for (const cod of Object.keys(req.body.cod_condenas)) {
            await em.getConnection().execute(
                `insert into pena_condenas (pena_cod_recluso_cod_recluso, pena_fecha_ini, condena_cod_condena) 
                 values (?, ?, ?);`, 
                [req.body.cod_recluso, finalDate, req.body.cod_condenas[cod]]
            );
        }

        let max = await em.getConnection().execute(`select max(sen.orden_de_gravedad) as max
                                                    from condena sen
                                                    inner join pena_condenas c_s on c_s.condena_cod_condena = sen.cod_condena
                                                    where c_s.pena_cod_recluso_cod_recluso = ? and pena_fecha_ini = ?;`, [req.body.cod_recluso, finalDate]);

        let cod_condena = await em.getConnection().execute(`select sen.cod_condena as cod
                                                              from condena sen
                                                              where sen.orden_de_gravedad = ?;`, [max[0].max]);
        console.log(cod_condena)
        let cod_sector = await em.getConnection().execute(`select c.cod_sector_cod_sector as cod_sector
                                                           from sector_condenas s_s
                                                           inner join celda c on s_s.sector_cod_sector = c.cod_sector_cod_sector
                                                           where s_s.condena_cod_condena = ?
                                                           limit 1;`, [cod_condena[0].cod]);
        console.log(cod_sector)
        let cod_celdas = await em.getConnection().execute(`select c.cod_celda as cod, c.capacidad, count(e.cod_celda_cod_celda)
                                                           from celda c
                                                           left join estadia e on c.cod_celda = e.cod_celda_cod_celda
                                                           where e.fecha_fin is null and c.cod_sector_cod_sector = ?
                                                           group by c.cod_celda
                                                           having c.capacidad > count(e.cod_celda_cod_celda)
                                                           limit 1;`, [cod_sector[0].cod_sector]);
        console.log(cod_celdas)
        let estadia = await em.getConnection().execute(`insert into estadia (cod_recluso_cod_recluso, cod_celda_cod_celda, cod_celda_cod_sector_cod_sector, fecha_ini, fecha_fin)
                                                        values (?, ?, ?, ?, null);`, [req.body.cod_recluso, cod_celdas[0].cod, cod_sector[0].cod_sector, finalDate]);
        await em.flush()
        res.status(201).json({ status: 201 })
    } catch (error: any) {
        res.status(500).json({message : error.message})
    }
}

async function finalizarPenas(req:Request, res:Response){
    try{
        let penas = await em.getConnection().execute(
            `select *
            from pena
            where fecha_fin_estimada <= curdate() and fecha_fin_real is null;`);
        if(penas.length !== 0){
            let estadias_a_terminar = await em.getConnection().execute(
                `update estadia
                set fecha_fin = curdate()
                where cod_recluso_cod_recluso in (select cod_recluso_cod_recluso from pena where fecha_fin_estimada <= curdate() and fecha_fin_real is null);`);
            let penass = await em.getConnection().execute(
                `update pena
                set fecha_fin_real = curdate()
                where fecha_fin_estimada <= curdate();`);
            res.status(201).json({ data: penas })
        } else {
            res.status(404).json({ message: 'no se tienen que terminar penas'})
        }
    } catch (error: any) {
        res.status(400).json({ message: 'error'})
    }
}

export { getAll, add, finalizarPenas }








