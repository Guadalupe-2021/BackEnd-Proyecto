import * as v from 'valibot';

export const condenaSchema = v.object({
  cod_condena: v.optional(v.number()),

  nombre: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(1, 'El nombre es obligatorio'),
    v.maxLength(100, 'Nombre demasiado largo')
  ),

  descripcion: v.optional(
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(500, 'Descripción demasiado larga')
    )
  ),

  duracion_anios: v.pipe(
    v.number(),
    v.minValue(0, 'Debe ser mayor o igual a 0')
  ),

  duracion_meses: v.pipe(
    v.number(),
    v.minValue(0),
    v.maxValue(11, 'Meses inválidos')
  ),

  duracion_dias: v.pipe(
    v.number(),
    v.minValue(0),
    v.maxValue(31, 'Días inválidos')
  ),

  orden_de_gravedad: v.pipe(
    v.number(),
    v.minValue(1, 'Orden inválido')
  ),

  pena: v.optional(
    v.object({
      cod_pena: v.number()
    })
  ),

  recluso: v.optional(
    v.object({
      cod_recluso: v.number()
    })
  )
});

export const valibot_condena = v.safeParserAsync(condenaSchema)