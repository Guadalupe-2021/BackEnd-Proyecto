import { Entity, PrimaryKey, Property, ManyToMany, Cascade, OneToMany } from "@mikro-orm/core";
import { Condena } from "../condena/condena.entity.js";
import { Actividad } from "../actividad/actividad.entity.js";

@Entity()
export class Sector {
    @PrimaryKey({ nullable: false, unique: true})
    cod_sector !: string

    @Property({ nullable: false, unique: true})
    nombre !: string

    @Property({ nullable: false, unique: false})
    descripcion !: string

    @OneToMany(()=> Actividad ,(actividad)=>actividad.cod_sector)
    actividades:Actividad[]=[]
    //@ManyToMany(() => Condena, (condena) => condena.sectores, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: true})
    //Condenas !: Condena[]
}
