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
    dia_de_la_semana !: string  // no vamos a guardar el nombre del dia de la semana, hay que transformarlo siempre y no tiene sentido. pero si vamos a mantener el numero
    
    @Property({ nullable: false})
    hora_inicio !: string

    @Property({ nullable: false})
    hora_fin !: string

    @Property({nullable: false})
    cant_cupos !: number
    // cambiar nombre a cupos


    @ManyToOne(() => Sector)
    cod_sector !: Rel<Sector>
    

    @ManyToMany( () => Recluso, (recluso) => recluso.actividades ,{eager:true ,nullable:true}) // , cascade: [Cascade.ALL], owner: true
    reclusos ?: Recluso[]
}   







