import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Turno } from "../turno/turno.entity.js";

@Entity()
export class Guardia {
    @PrimaryKey({ nullable: false, unique: true, primary: true, autoincrement: true })
    cod_guardia !: number
    
    @Property({ nullable: false, length: 35 })
    nombre !: string 

    @Property({ nullable: false, length: 35 })
    apellido !: string

    @Property({ nullable: false})
    dni !: number

    @Property({ nullable: false})
    fecha_ini_contrato !: Date

    @Property({ nullable: true})
    fecha_fin_contrato ?: Date

    @OneToMany(() => Turno,(turno)=>turno.guardia)
    turnos = new Collection<Turno>(this);
}   
