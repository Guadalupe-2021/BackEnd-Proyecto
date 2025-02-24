import 'reflect-metadata'; 
import { Entity, PrimaryKey, Property, ManyToMany, Cascade, OneToMany, OneToOne } from "@mikro-orm/core";
import { Actividad } from "../actividad/actividad.entity.js";
import { Taller } from "../taller/taller.entity.js";
import { ActividadIlegal } from "../actividadIlegalDir/actividadIlegal.entity.js";
import { Condena } from "../condena/condena.entity.js";
import { Pena } from "../pena/pena.entity.js";

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
    
    @OneToOne(()=>Pena,{eager:true})
    pena!:Pena


    // METODOS
 asignarPena(condenas:Condena[]){
  let anios = 0
  let meses = 0
  let dias = 0
  condenas.forEach((condena)=>{
    anios+=condena.duracion_anios
    meses+=condena.duracion_meses
    dias+=condena.duracion_dias

  })
      if(!this.pena){
        this.pena = new Pena()
        const fecha_ini = new Date()
        this.pena.fecha_ini = new Date()
        this.pena.fecha_fin_estimada = fecha_ini
        this.pena.fecha_fin_estimada.setFullYear(this.pena.fecha_fin_estimada.getFullYear() + anios);
        this.pena.fecha_fin_estimada.setMonth(this.pena.fecha_fin_estimada.getMonth() + meses);
        this.pena.fecha_fin_estimada.setDate(this.pena.fecha_fin_estimada.getDate() + dias);
        condenas.forEach((condena)=>{
          condena.pena = this.pena
        })
      }  
  }

}