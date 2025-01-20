import db_conn from '../db.js';
import { generate_str_of_dict, rd_key, get_keys_dict } from '../helpers/helpers.mjs';

// Obtener todos los mercancias
export const get_mercancias = async (sl, rs) => {
  try {
    const { rows, rowCount } = await db_conn.query('SELECT * FROM mercancia');
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: 'No se encotraron mercancias registradas' });
    }

    rs.json({ status: rs.statusCode, message: 'Mercancias encontradas', size_data: rowCount, data: rows });
  } catch (e) {
    console.log(e)
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener los mercancias', error_code: e.code });
  }
};

// Obtener un único mercancia
export const get_mercancia = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('SELECT * FROM mercancia WHERE id = $1', [up_id]);
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encotró la mercancia con id = ${up_id}` });
    }

    rs.json({ status: rs.statusCode, message: 'Mercancia encontrada', data: rows[0] });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener la mercancia', error_code: e.code });
  }
};

// Agregar mercancia
export const add_mercancia = async (sl, rs) => {
  try {
    // ID aleatorio
    const id_rd = rd_key(8);
    const data = sl.body;

    const { rows, rowCount } = await db_conn.query('INSERT INTO mercancia(id, fch_ingreso, fch_salida, ancho, alto, largo, bodega,contenido, cliente_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [id_rd, data.ingreso, data.salida, data.ancho, data.alto, data.largo, data.bodega, data.contenido, data.cliente_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'La mercancia no se agregó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'Mercancia agregada', data: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al agregar la mercancia', error_code: e.code });
  }
};

export const delete_mercancia = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('DELETE FROM mercancia WHERE id = $1  RETURNING *', [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encontró la mercancía con ID = ${up_id}` });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'Mercancia eliminada', data: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al eliminar la mercancia', error_code: e.code });
  }
};

export const update_mercancia = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const data = sl.body;
    // Generar datos que se actualizarán (contenido = '...', fragil: false)
    // Según lo recibido en el body
    const str_query = generate_str_of_dict(data);
    const cols_afected = get_keys_dict(data);

    const { rows, rowCount } = await db_conn.query(`UPDATE mercancia SET ${str_query} WHERE id = $1  RETURNING ${cols_afected}`, [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'La mercancia no se actualizó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'Mercancia actualizada', updated_fields: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al actualizar la mercancia', error_code: e.code });
  }
};
