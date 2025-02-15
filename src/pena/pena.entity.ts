import { Entity, ManyToOne, Property, Rel, PrimaryKeyProp, PrimaryKey, ManyToMany, Cascade } from "@mikro-orm/core";
import { Recluso } from "../recluso/recluso.entity.js";
import { Condena } from "../condena/condena.entity.js";



@Entity()
export class Pena {
    @ManyToOne(() => Recluso, { primary: true, nullable: false })
    cod_recluso !: Rel<Recluso>

    @PrimaryKey({primary : true, unique : false, nullable : false})
    fecha_ini !: Date

    @Property({unique : false, nullable : true})
    fecha_fin_estimada !: Date

    @Property({unique : false, nullable : true})
    fecha_fin_real !: Date

    @ManyToMany(() => Condena, (condena) => condena.penas, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: true})
    condenas !: Condena[]

    [PrimaryKeyProp] !: ['cod_recluso', 'fecha_ini'];
}
