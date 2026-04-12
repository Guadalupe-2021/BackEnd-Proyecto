import { Entity, ManyToOne, Property, Rel, PrimaryKeyProp, PrimaryKey, ManyToMany, Cascade, Collection, Unique } from "@mikro-orm/core";
import { Guardia } from "../guardia/guardia.entity.js";
import { Sector } from "../sector/sector.entity.js";


@Entity()
@Unique({ properties: ['fecha', 'tipo_turno', 'guardia', 'sector'] } )
export class Turno {
    @PrimaryKey({ nullable: false, unique: true})
    cod_turno ?: number ;

    @Property({ type : 'date'}) // yyyy-MM-dd
    fecha !: string

    @Property({ columnType: 'char(1)' }) // [M|T|N] Mañana, Tarde o Noche
    tipo_turno !: 'M' | 'T' | 'N';

    @ManyToOne(() => Guardia)
    guardia !: Rel<Guardia>;

    @ManyToOne(() => Sector, {nullable: false })
    sector !: Rel<Sector>

}

// Para una fecha determinada se crean 3 turnos Mañana, Tarde y Noche

