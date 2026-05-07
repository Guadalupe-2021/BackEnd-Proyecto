/**
 * @swagger
 * components:
 *   schemas:
 *     ApiResponse:
 *      type: object
 *      properties:
 *       status:
 *         type: integer
 *         example: 200
 *       data:
 *         type: object
 *         nullable: true
 *       message:
 *         type: string
 *         nullable: true
 *       token:
 *         type: string
 *         nullable: true
 * 
 *     Usuario:
 *      type: object
 *      required:
 *        - nombre
 *        - contrasenia
 *      properties:
 *       nombre:
 *         type: integer
 *         example: 200
 *       contrasenia:
 *         type: string
 *         nullable: true
 *         example: holads
 * 
 *     Guardia:
 *       type: object
 *       required:
 *         - cod_guardia
 *         - nombre
 *         - apellido
 *         - dni
 *         - fecha_ini_contrato
 *       properties:
 *         cod_guardia:
 *           type: integer
 *           description: Codigo unico identificador de guardia
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Juan
 *         apellido:
 *           type: string
 *           example: Pérez
 *         dni:
 *           type: integer
 *           description: Numero del Documento Nacional de Identidad
 *           example: 32123456
 *         fecha_ini_contrato:
 *           type: string
 *           format: date
 *           description: Fecha de contratacion
 *           example: 2024-01-01
 * 
 *     ReclusoBase:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - dni
 *         - fecha_nac
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del recluso
 *           example: Juan
 *         apellido:
 *           type: string
 *           description: Apellido del recluso
 *           example: Pérez
 *         dni:
 *           type: integer
 *           description: Número de documento nacional de identidad
 *           example: 32123456
 *         fecha_nac:
 *           type: string
 *           format: date
 *           description: Fecha de nacimiento del recluso
 *           example: 1990-05-20
 * 
 *     Recluso:
 *       allOf:
 *         - $ref: '#/components/schemas/ReclusoBase'
 *         - type: object
 *           properties:
 *             cod_recluso:
 *               type: integer
 *               description: Identificador único del recluso
 *               example: 1
 *           required:
 *             - cod_recluso
 * 
 *     ReclusoCondenas:
 *       allOf:
 *         - $ref: '#/components/schemas/ReclusoBase'
 *         - type: object
 *           properties:
 *             condenas:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/CondenaBase'
 * 
 *     ReclusoAll:
 *       allOf:
 *         - $ref: '#/components/schemas/Recluso'
 *         - type: object
 *           properties:
 *             actividades:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Actividad'
 *             condenas:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Condena'
 *             penas:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Pena'
 * 
 *     ActividadBase:
 *       type: object
 *       required:
 *         - nombre
 *         - dia_de_la_semana
 *         - hora_inicio
 *         - hora_fin
 *         - cant_cupos
 *         - cod_sector
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la actividad
 *           example: Taller de carpintería
 *         descripcion:
 *           type: string
 *           description: Descripción de la actividad (opcional)
 *           example: Aprendizaje básico de carpintería
 *         dia_de_la_semana:
 *           type: string
 *           description: Día de la semana en que se realiza la actividad
 *           example: Lunes
 *         hora_inicio:
 *           type: string
 *           description: Hora de inicio de la actividad
 *           example: 08:00
 *         hora_fin:
 *           type: string
 *           description: Hora de finalización de la actividad
 *           example: 10:00
 *         cant_cupos:
 *           type: integer
 *           description: Cantidad de cupos disponibles para la actividad
 *           example: 20
 *         cod_sector:
 *            type: string
 *            description: Codigo del sector en donde se realiza la actividad
 *            example: 1
 * 
 *     Actividad:
 *       allOf:
 *         - $ref: '#/components/schemas/ActividadBase'
 *         - type: object
 *           properties:
 *             cod_actividad:
 *               type: integer
 *               description: Identificador único de la actividad
 *               example: 1
 *     CondenaBase:
 *       type: object
 *       required:
 *         - nombre
 *         - duracion_anios
 *         - duracion_meses
 *         - duracion_dias
 *         - orden_de_gravedad
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre de la condena
 *           example: Robo agravado
 *         descripcion:
 *           type: string
 *           description: Descripción de la condena (opcional)
 *           example: Con pena agravada por reincidencia
 *         duracion_anios:
 *           type: integer
 *           description: Duración de la condena en años
 *           example: 2
 *         duracion_meses:
 *           type: integer
 *           description: Duración de la condena en meses
 *           example: 6
 *         duracion_dias:
 *           type: integer
 *           description: Duración de la condena en días
 *           example: 15
 *         orden_de_gravedad:
 *           type: integer
 *           description: Nivel de gravedad de la condena
 *           example: 3
 *     Condena:
 *       allOf:
 *         - $ref: '#/components/schemas/ActividadBase'
 *         - type: object
 *           properties:
 *             cod_condena:
 *               type: integer
 *               description: Identificador único de la condena
 *               example: 1
 *     Pena:
 *       type: object
 *       properties:
 *         fecha_ini:
 *           type: string
 *           format: date
 *           description: Fecha de inicio de la pena
 *           example: "2026-01-01"
 *         fecha_fin_estimada:
 *           type: string
 *           format: date
 *           description: Fecha estimada de fin de la pena
 *           example: "2028-01-01"
 *           nullable: true
 *         fecha_fin_real:
 *           type: string
 *           format: date
 *           description: Fecha real de fin de la pena (si aplica)
 *           example: "2028-01-15"
 *           nullable: true
 *         cod_recluso:
 *           example: 1
 *       required:
 *         - fecha_ini
 *         - cod_recluso
 * 
 *     Turno:
 *       type: object
 *       required:
 *         - fecha
 *         - tipo_turno
 *         - cod_sector
 *         - cod_guardia
 *       properties:
 *         fecha:
 *           type: string
 *           description: Fecha del turno
 *           example: 2026-05-05
 *         tipo_turno:
 *           type: string
 *           description: Tipo de turno (M-Mañana, T-Tarde, N-Noche)
 *           example: M
 *         cod_sector:
 *           type: string
 *           description: Código del sector en el que transcurre el turno
 *           example: AA
 *         cod_guardia:
 *           type: integer
 *           description: Código del guardia que asiste al turno
 *           example: 1990-05-20
 * 
 *     TurnosBatch:
 *       type: object
 *       required:
 *         - dias
 *         - tipo_turno
 *         - cod_sectores
 *         - cod_guardias
 *       properties:
 *         dias:
 *           type: array
 *           description: Fechas de los turnos
 *           items:
 *             type: number
 *             example: 1
 *         tipo_turno:
 *           type: string
 *           enum: [M, T, N]
 *           description: Tipo de turno (M-Mañana, T-Tarde, N-Noche)
 *           example: M
 *         cod_sector:
 *           description: Sectores donde transcurren los turnos
 *           items:
 *             type: string
 *             maxLength: 2
 *             example: AA
 *         cod_guardia:
 *           type: array
 *           description: Guardias asignados a los turnos
 *           items:
 *             type: integer
 *             example: 15
 * 
 * 
 *     Sector:
 *       type: object
 *       required:
 *         - cod_sector
 *         - nombre
 *         - descripcion
 *       properties:
 *         cod_sector:
 *           type: string
 *           maxLength: 2
 *           pattern: '^[A-Z]{1,2}$'
 *           description: Código único del sector
 *           example: AA
 *
 *         nombre:
 *           type: string
 *           maxLength: 100
 *           pattern: '^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s]+$'
 *           description: Nombre del sector
 *           example: Patio Norte 1
 *
 *         descripcion:
 *           type: string
 *           maxLength: 500
 *           description: Descripción del sector
 *           example: Sector destinado a recreación
 *
 */