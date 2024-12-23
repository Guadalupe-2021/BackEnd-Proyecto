//librerias y modulos
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { guardiaRouter } from './guardiaDir/guardia.routes.js'
import { actividadRouter } from './actividadDir/actividad.routes.js'
import { sentenciaRouter } from './sentenciaDir/sentencia.routes.js'
import { celdaRouter } from './celdaDir/celda.routes.js'
import { sectorRouter } from './sectorDir/sector.routes.js'
import { administradorRouter } from './administradorDir/administrador.routes.js'
import { condenaRouter } from './condenaDir/condena.routes.js'
import { estadiaRouter } from './estadiaDir/estadia.routes.js'
import { reclusoRouter } from './reclusoDir/recluso.routes.js'
import { tallerRouter } from './tallerDir/taller.routes.js'
import { turnoRouter } from './turnoDir/turno.routes.js'
import { actividadIlegalRouter } from './actividadIlegalDir/actividadIlegal.routes.js'

var router = express.Router();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:4200",
  preflightContinue: false,
};
//misc
const app = express()

app.use(cors(options))

app.use(express.json())

app.use((req, res, next) => {
  RequestContext.create(orm.em, next)
})

app.use('/actividades', actividadRouter)
app.use('/actividadesIlegales', actividadIlegalRouter)
app.use('/guardias', guardiaRouter)
app.use('/sentencias', sentenciaRouter)
app.use('/sectores', sectorRouter)
app.use('/administradores', administradorRouter)
app.use('/reclusos', reclusoRouter)
app.use('/condenas', condenaRouter)
app.use('/talleres', tallerRouter)
app.use('/sectores', sectorRouter)
app.use('/celdas', celdaRouter)
app.use('/estadias', estadiaRouter)
app.use('/turnos', turnoRouter)
app.use((_, res) => {
    return res.status(404).send({ message: 'Resource not found' })
})

await syncSchema()  // solo en etapas de desarrollo  
  
// listen
app.listen(8080, () => {
    console.log('server correctly running at 8080')
})


/*

| estadia                   |
| sector                    |
| sector_sentencias         |

*/















