import { Router } from 'express';
import { add_sobre, delete_sobre, get_sobre, get_sobres, update_sobre } from '../controllers/sobre.controller.js';

const sobre_router = Router();

// Obtener todos los sobres
sobre_router.get('/sobre', get_sobres);
sobre_router.get('/sobre/:id', get_sobre);
sobre_router.post('/sobre', add_sobre);
sobre_router.delete('/sobre/:id', delete_sobre);
sobre_router.put('/sobre/:id', update_sobre);
sobre_router.patch('/sobre/:id', update_sobre);

export default sobre_router;
