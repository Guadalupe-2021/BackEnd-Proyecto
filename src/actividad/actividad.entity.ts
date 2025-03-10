import { Entity, PrimaryKey, Property, ManyToMany, Cascade, ManyToOne, Rel } from "@mikro-orm/core";
import { Recluso } from "../recluso/recluso.entity.js";
import { Sector } from "../sector/sector.entity.js";

@Entity()
export class Actividad {
    @PrimaryKey({ nullable: false, unique: true, autoincrement: true})
    cod_actividad ?: number  // el !: significa que esta propiedad no puede ser nula
    
    @Property({ nullable: false})
    nombre !: string 

    @Property({ nullable: true})
    descripcion ?: string

    @Property({ nullable: false})
    locacion !: string

    @Property({ nullable: false})
    dia_de_la_semana !: number  // no vamos a guardar el nombre del dia de la semana, hay que transformarlo siempre y no tiene sentido. pero si vamos a mantener el numero
    
    @Property({ nullable: false})
    hora_inicio !: number

    @Property({ nullable: false})
    hora_fin !: number

    @Property({nullable: false})
    estado !: 1

    @Property({nullable: false})
    cantidad_minima !: number

    @Property({nullable: false})
    edad_minima !: number

    @ManyToOne(() => Sector, { nullable: false })
    cod_sector !: Rel<Sector>

    //@ManyToMany(() => Recluso, (recluso) => recluso.actividades, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: true})
    //reclusos !: Recluso[]
}   







