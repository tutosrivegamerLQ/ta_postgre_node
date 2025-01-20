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
const port = process.env.PORT || 4000;

app.setMaxListeners(10);

// Escuchar puerto (localhost:4500)
app.listen(port, () => {
  console.log('Running server in port: ', port);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://tasrm.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  req.header('Access-Control-Allow-Origin', 'https://tasrm.onrender.com');
  req.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH');
  req.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Para que la API comprenda los "POST" con body JSON
app.use(express.json());

// "Debug", mostrar solicitudes realizadas
app.use(morgan('dev'));

// Routers
app.use([client_route, page_route, bulto_router, paquete_router, mercancia_router, caja_router, sobre_router, rd_router]);
