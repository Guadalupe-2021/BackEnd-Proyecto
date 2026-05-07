import * as v from 'valibot';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const turnoSchema = v.object({

  cod_turno: v.optional(
    v.pipe(
      v.number(),
      v.minValue(1)
    )
  ),

  fecha: v.pipe(
    v.string(),
    v.trim(),
    v.regex(DATE_REGEX,'Formato inválido yyyy-MM-dd'),
    v.transform((fecha)=>fecha.split("T")[0]),
    v.check((fecha) => {
      const date = new Date(fecha);
      return !isNaN(date.getTime());
    }, 'Fecha inválida')
  ),

  tipo_turno: v.picklist(['M', 'T', 'N'],'Tipo de turno inválido'),

  cod_guardia: v.pipe(
    v.number(),
    v.minValue(1)
  ),

  cod_sector: v.pipe(
    v.string(),
    v.trim(),
    v.transform((value) => value.toUpperCase()),
    v.regex(/^[A-Z]{1,2}$/,'Código de sector inválido')
  )


});


export const valibot_turno = v.safeParserAsync(turnoSchema)