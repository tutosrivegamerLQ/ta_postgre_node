import { Router } from 'express';
import db_conn from '../db.js';
import { rd_from_list } from '../helpers/helpers.mjs';

const rd_router = Router();

rd_router.get('/rd_cls', async (req, res) => {
  try {
    const { rows } = await db_conn.query('SELECT id FROM cliente');
    db_conn.on('error', (e) => {
      throw e;
    });
    const id = rd_from_list(rows).id;
    res.json({ id });
  } catch (error) {
    res.json({ status: rs.statusCode, message: 'Error', error });
  }
});

export default rd_router;
