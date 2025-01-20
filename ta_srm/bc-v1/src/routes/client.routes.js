import { Router } from 'express';
import { add_client, del_client, get_client, get_clients, update_client } from '../controllers/client.controller.js';

const client_route = Router();

// Obtener usuarios
client_route.get('/cliente', get_clients);

// Obtener único usuario
client_route.get('/cliente/:id', get_client);

// Añadir usuario
client_route.post('/cliente/', add_client);

// Eliminar cliente
client_route.delete('/cliente/:id', del_client);

// Actualizar clientes
client_route.put('/cliente/:id', update_client);
client_route.patch('/cliente/:id', update_client);

export default client_route;
