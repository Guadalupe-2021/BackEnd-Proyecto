import { Entity, PrimaryKey, Property, ManyToMany, Cascade, ManyToOne, Rel } from "@mikro-orm/core";
import { Recluso } from "../reclusoDir/recluso.entity.js";
import { Sector } from "../sectorDir/sector.entity.js";

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
    diaDeLaSemana !: number  // no vamos a guardar el nombre del dia de la semana, hay que transformarlo siempre y no tiene sentido. pero si vamos a mantener el numero
    
    @Property({ nullable: false})
    horaInicio !: number

    @Property({ nullable: false})
    horaFin !: number

    @Property({nullable: false})
    estado !: 1

    @Property({nullable: false})
    cantidadMinima !: number

    @Property({nullable: false})
    edadMinima !: number

    @ManyToOne(() => Sector, { nullable: false })
    cod_sector !: Rel<Sector>

    @ManyToMany(() => Recluso, (recluso) => recluso.actividades, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: true})
    reclusos !: Recluso[]
}   







