import { Entity, PrimaryKey, Property, ManyToMany, Cascade, Rel, ManyToOne } from "@mikro-orm/core";
import { Pena } from "../pena/pena.entity.js";
import { Sector } from "../sector/sector.entity.js";
import { Recluso } from "../recluso/recluso.entity.js";

@Entity()
export class Condena {
    @ManyToOne(() => Recluso)
    recluso !: Recluso

    @PrimaryKey( {nullable: false, unique: true})
    cod_condena !: number

    @Property( {nullable: false, unique: true} )
    nombre !: string

    @Property( {nullable: true, unique: false} )
    descripcion ?: string
    
    @Property( {nullable: false, unique: false} )
    duracion_anios !: number

    @Property( {nullable: false, unique: false} )
    duracion_meses !: number

    @Property( {nullable: false, unique: false} )
    duracion_dias !: number

    @Property( {nullable: false, unique: false} )
    orden_de_gravedad !: number

    @ManyToMany(() => Pena, (pena) => pena.condenas, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: false})
    penas ?: Pena[]

    //@ManyToMany(() => Sector, (sector) => sector.condenas, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: false})
    //sectores !: Sector[]
}
