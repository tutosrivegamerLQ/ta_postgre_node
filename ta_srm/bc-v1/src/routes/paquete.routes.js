import { Router } from 'express';
import { add_paquete, delete_paquete, get_paquete, get_paquetes, update_paquete } from '../controllers/paquete.controller.js';

const paquete_router = Router();

// Obtener todos los paquetes
paquete_router.get('/paquete', get_paquetes);
paquete_router.get('/paquete/:id', get_paquete);
paquete_router.post('/paquete', add_paquete);
paquete_router.delete('/paquete/:id', delete_paquete);
paquete_router.put('/paquete/:id', update_paquete);
paquete_router.patch('/paquete/:id', update_paquete);

export default paquete_router;
