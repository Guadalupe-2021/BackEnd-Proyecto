import { Entity, ManyToOne, Property, Rel, PrimaryKeyProp, PrimaryKey, ManyToMany, Cascade, OneToOne, OneToMany } from "@mikro-orm/core";
import { Recluso } from "../recluso/recluso.entity.js";
import { Condena } from "../condena/condena.entity.js";



@Entity()
export class Pena {
    
    @PrimaryKey({primary : true, unique : true, nullable : false})
    fecha_ini !: Date
    
    @Property({unique : false, nullable : true})
    fecha_fin_estimada !: Date
    
    @Property({unique : false, nullable : true})
    fecha_fin_real !: Date
    
    @OneToMany(() => Condena, (condena) => condena.pena)
    condenas !: Rel<Condena>[]
    
    @ManyToOne(() => Recluso, {primary: true, nullable: false })
    recluso !: Rel<Recluso>

    [PrimaryKeyProp] !: [ 'recluso','fecha_ini'];
}
