import { Entity, PrimaryKey, Property, ManyToMany, Cascade, OneToMany } from "@mikro-orm/core";
import { Actividad } from "../actividad/actividad.entity.js";
import { Taller } from "../taller/taller.entity.js";
import { ActividadIlegal } from "../actividadIlegalDir/actividadIlegal.entity.js";
import { Condena } from "../condena/condena.entity.js";
import { string } from "valibot";

@Entity()
export class Recluso {
    @PrimaryKey({ nullable: false, unique: true})
    cod_recluso !: number  // el !: significa que esta propiedad no puede ser nula
    
    @Property({ nullable: false})
    nombre !: string 

    @Property({ nullable: false})
    apellido !: string

    @Property({ nullable: false, type:'string'}) // type number has int limits ( 2,147,483,647 max or error)
    dni !: number

    @Property({ nullable: false})
    fecha_nac !: Date

    //@ManyToMany(() => Actividad, (actividad) => actividad.reclusos, { eager: true, unique : false, nullable : false, cascade: [Cascade.ALL], owner: false})
    //actividades !: Actividad[]

    //@ManyToMany(() => Taller, (taller) => taller.reclusos, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: false})
    //talleres !: Taller[]

    //@ManyToMany(() => ActividadIlegal, (act_ilegal) => act_ilegal.reclusos, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: false})
    //actividades_ilegales !: ActividadIlegal[]

    @OneToMany(() => Condena, condena => condena.recluso, { eager: true })
        condenas: Condena[] = [];
}