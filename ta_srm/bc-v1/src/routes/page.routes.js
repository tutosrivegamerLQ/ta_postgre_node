import { Router } from 'express';
import { welcome } from '../controllers/page.controller.js';

const page_route = Router();

page_route.get('/', welcome);

export default page_route;
