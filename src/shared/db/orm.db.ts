import { EntityManager, EntityRepository, MikroORM, Options } from '@mikro-orm/mysql';
import { Administrador } from '../../administrador/administrador.entity.js';
import { Guardia } from '../../guardia/guardia.entity.js';
import { Pena } from '../../pena/pena.entity.js';
import { Celda } from '../../celda/celda.entity.js';
import { Condena } from '../../condena/condena.entity.js';
import { Recluso } from '../../recluso/recluso.entity.js';
import { Sector } from '../../sector/sector.entity.js';
import { Taller } from '../../taller/taller.entity.js';
import { Turno } from '../../turno/turno.entity.js';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  administrador: EntityRepository<Administrador>;
  celda: EntityRepository<Celda>;
  condena: EntityRepository<Condena>;
  guardia: EntityRepository<Guardia>;
  pena: EntityRepository<Pena>;
  recluso: EntityRepository<Recluso>;
  sector: EntityRepository<Sector>;
  taller: EntityRepository<Taller>;
  turno: EntityRepository<Turno>;
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(options);

  // save to cache before returning
  return cache = {
    orm,
    em: orm.em,
    administrador: orm.em.getRepository(Administrador),
    celda: orm.em.getRepository(Celda),
    condena: orm.em.getRepository(Condena),
    guardia: orm.em.getRepository(Guardia),
    pena: orm.em.getRepository(Pena),
    recluso: orm.em.getRepository(Recluso),
    sector: orm.em.getRepository(Sector),
    taller: orm.em.getRepository(Taller),
    turno: orm.em.getRepository(Turno),
  };
}