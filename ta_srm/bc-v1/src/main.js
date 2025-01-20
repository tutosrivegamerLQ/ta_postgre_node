import morgan from 'morgan';
import express from 'express';
import client_route from './routes/client.routes.js';
import page_route from './routes/page.routes.js';
import bulto_router from './routes/bulto.routes.js';
import paquete_router from './routes/paquete.routes.js';
import mercancia_router from './routes/mercancia.routes.js';
import caja_router from './routes/caja.routes.js';
import sobre_router from './routes/sobre.routes.js';
import rd_router from './controllers/rd.controller.js';

// Principal app
const app = express();
const port = process.env.PORT || 4000

app.setMaxListeners(10);

// Escuchar puerto (localhost:4500)
app.listen(port, ()=>{
  console.log('Running server in port: ', port)
});

// Para que la API comprenda los "POST" con body JSON
app.use(express.json());

// "Debug", mostrar solicitudes realizadas
app.use(morgan('dev'));

// Routers
app.use([client_route, page_route, bulto_router, paquete_router, mercancia_router, caja_router, sobre_router, rd_router]);
console.log(`Listen server in PORT: ${process.env.PORT}`);
