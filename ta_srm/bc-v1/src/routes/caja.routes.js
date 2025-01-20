import { Router } from 'express';
import { add_caja, delete_caja, get_caja, get_cajas, update_caja } from '../controllers/caja.controller.js';

const caja_router = Router();

// Obtener todos los cajas
caja_router.get('/caja', get_cajas);
caja_router.get('/caja/:id', get_caja);
caja_router.post('/caja', add_caja);
caja_router.delete('/caja/:id', delete_caja);
caja_router.put('/caja/:id', update_caja);
caja_router.patch('/caja/:id', update_caja);

export default caja_router;
