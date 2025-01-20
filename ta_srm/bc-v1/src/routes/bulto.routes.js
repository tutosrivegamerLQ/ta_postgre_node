import { Router } from 'express';
import { add_bulto, delete_bulto, get_bulto, get_bultos, update_bulto } from '../controllers/bulto.controller.js';

const bulto_router = Router();

// Obtener todos los bultos
bulto_router.get('/bulto', get_bultos);
bulto_router.get('/bulto/:id', get_bulto);
bulto_router.post('/bulto', add_bulto);
bulto_router.delete('/bulto/:id', delete_bulto);
bulto_router.put('/bulto/:id', update_bulto);
bulto_router.patch('/bulto/:id', update_bulto);

export default bulto_router;
