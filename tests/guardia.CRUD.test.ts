
import 'reflect-metadata'
import supertest, { Request } from "supertest";
import request from 'supertest';
import dotenv from 'dotenv';
import { app } from './app_test.js';

dotenv.config()

const ruta_origen = 'http://localhost:8081'
const tokenValido = process.env.VALID_TOKEN_TEST
const tokenInvalido = 'invalid-token'
let guardia1 = {cod_guardia: 1,nombre: "23r23r",apellido: "32r32r",dni: 234234,
  fecha_ini_contrato: "2025-02-04T00:00:00.000Z",fecha_fin_contrato: "2025-02-19T23:05:39.000Z"
}
const newGuardia = {nombre: "nuevo", apellido: "guardia", dni: 234234565,
  fecha_ini_contrato: "2025-02-04T00:00:00.000Z",fecha_fin_contrato: "2025-02-19T23:05:39.000Z"
}

describe('CRUD guardia localhost 8080',()=>{

  //POST
    it('POST /guardias shoud add a guardia status 201', async ()=>{
      const response = await supertest(ruta_origen)
      .post('/guardias')
      .set('Authorization', 'Bearer '+tokenValido)
      .send(newGuardia)
      .expect(201)
    })
    it('POST /guardias/:id shoud give ERROR 409 Conflict', async ()=>{
      const response = await supertest(ruta_origen)
      .post('/guardias')
      .set('Authorization', 'Bearer '+tokenValido)
      .send(newGuardia)
      .expect(409)
    })
      it('POST /guardias/:id shoud give ERROR 500 because of invalid token', async ()=>{
      const response = await supertest(ruta_origen)
      .post('/guardias')
      .set('Authorization', 'Bearer '+tokenInvalido)
      .send(newGuardia)
      .expect(500)
    })


// PUT
    it('PUT /guardias shoud modify a guardia status 200', async ()=>{
      const { cod_guardia, ...mod_guardia1} = guardia1
      const response = await request(ruta_origen)
      .put('/guardias/1/modificar')
      .set('Authorization', 'Bearer '+tokenValido)
      .send(mod_guardia1)
      .expect(200)
    })
    it('PUT /guardias/:id shoud give ERROR 404 Not Found', async ()=>{
      const response = await request(ruta_origen)
      .put('/guardias/1344/modificar')
      .set('Authorization', 'Bearer '+tokenValido)
      .send(newGuardia)
      .expect(404)
    expect(response.body.message).toBe('Not Found')
    })


      //GET
  it('shoud give status 201 for a GET /guardias/1',async ()=>{
    const response = await request(ruta_origen)
    .get('/guardias/1')
    .set('Authorization','Bearer '+tokenValido)
    .expect(201)
    expect(response.body).toEqual(guardia1)
  })
    it('shoud give ERROR status 404 not found for a GET ',async ()=>{
    const response = await request(ruta_origen)
    .get('/guardias/123')
    .set('Authorization','Bearer '+tokenValido)
    .expect(404)
  })
    it('shoud give ERROR status 500 for a GET with invalid token',async ()=>{
    const response = await request(ruta_origen)
    .get('/guardias/1')
    .set('Authorization','Bearer '+tokenInvalido)
    .expect(500)
  })
  it('shoud drop and re-create schema',async ()=>{
    const response = await request(ruta_origen)
    .get('/end-testing')
    .set('Authorization','Bearer '+tokenValido)
  })
    
})