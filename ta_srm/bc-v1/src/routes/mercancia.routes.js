import { Router } from 'express';
import { add_mercancia, delete_mercancia, get_mercancia, get_mercancias, update_mercancia } from '../controllers/mercancia.controller.js';

const mercancia_router = Router();

// Obtener todos los mercancias
mercancia_router.get('/mercancia', get_mercancias);
mercancia_router.get('/mercancia/:id', get_mercancia);
mercancia_router.post('/mercancia', add_mercancia);
mercancia_router.delete('/mercancia/:id', delete_mercancia);
mercancia_router.put('/mercancia/:id', update_mercancia);
mercancia_router.patch('/mercancia/:id', update_mercancia);

export default mercancia_router;
