import { Entity, PrimaryKey, Property, ManyToMany, Cascade, Rel, ManyToOne } from "@mikro-orm/core";
import { Pena } from "../pena/pena.entity.js";
import { Sector } from "../sector/sector.entity.js";
import { Recluso } from "../recluso/recluso.entity.js";

@Entity()
export class Condena {
    @ManyToOne(() => Recluso)
    recluso !: Recluso
    
    @ManyToOne(() => Pena, {nullable: true, eager:true})//{ unique : false, nullable : false, cascade: [Cascade.ALL], owner: false}
    pena ?: Pena

    @PrimaryKey( {nullable: false, unique: true})
    cod_condena !: number

    @Property( {nullable: false, unique: false} )
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


    //@ManyToMany(() => Sector, (sector) => sector.condenas, { unique : false, nullable : false, cascade: [Cascade.ALL], owner: false})
    //sectores !: Sector[]

    //METODOS
    // dada una condena, modificar la pena.fecha_fin_estimada
modificarPena(nueva_condena:Condena){
    const anios = nueva_condena.duracion_anios - this.duracion_anios
    const meses = nueva_condena.duracion_meses - this.duracion_meses
    const dias = nueva_condena.duracion_dias - this.duracion_dias
    console.log("modificando pena")
    if(this.pena!=undefined){
    console.log("modificando fechas de pena")
    console.log(this.pena)
    this.pena.fecha_fin_estimada.setFullYear(this.pena.fecha_fin_estimada.getFullYear() + anios);
    this.pena.fecha_fin_estimada.setMonth(this.pena.fecha_fin_estimada.getMonth() + meses);
    this.pena.fecha_fin_estimada.setDate(this.pena.fecha_fin_estimada.getDate() + dias);
    }
}

}
