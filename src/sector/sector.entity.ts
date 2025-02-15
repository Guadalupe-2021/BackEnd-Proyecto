import { Entity, PrimaryKey, Property, ManyToMany, Cascade } from "@mikro-orm/core";
import { Condena } from "../condena/condena.entity.js";

@Entity()
export class Sector {
    @PrimaryKey({ nullable: false, unique: true})
    cod_sector !: number

    @Property({ nullable: false, unique: true})
    nombre !: string

    @Property({ nullable: false, unique: false})
    descripcion !: string

    //@ManyToMany(() => Condena, (condena) => condena.sectores, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: true})
    //Condenas !: Condena[]
}
