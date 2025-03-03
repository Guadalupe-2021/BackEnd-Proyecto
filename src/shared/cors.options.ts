//options for cors midddleware
import cors from 'cors'
export const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'Authorization',
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