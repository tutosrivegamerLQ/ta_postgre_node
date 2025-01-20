//id | fragil | contenido | valor | peso | remitente_id | destinatario_id
import db_conn from '../db.js';
import { generate_str_of_dict, rd_key, get_keys_dict } from '../helpers/helpers.mjs';

// Obtener todos los cajas
export const get_cajas = async (sl, rs) => {
  try {
    const { rows, rowCount } = await db_conn.query('SELECT * FROM caja');
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: 'No se encotraron cajas registradas' });
    }

    rs.json({ status: rs.statusCode, message: 'Cajas encontradas', size_data: rowCount, data: rows });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener los cajas', error_code: e.code });
  }
};

// Obtener un único caja
export const get_caja = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('SELECT * FROM caja WHERE id = $1', [up_id]);
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encotró la caja con id = ${up_id}` });
    }

    rs.json({ status: rs.statusCode, message: 'Caja encontrada', data: rows[0] });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener la caja', error_code: e.code });
  }
};

// Agregar caja
export const add_caja = async (sl, rs) => {
  try {
    // ID aleatorio
    const id_rd = rd_key(8);
    const data = sl.body;

    const { rows, rowCount } = await db_conn.query('INSERT INTO caja(id, fragil, contenido, valor, peso, remitente_id, destinatario_id, ancho, alto, largo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [
      id_rd,
      data.fragil,
      data.contenido,
      data.valor,
      data.peso,
      data.remitente_id,
      data.destinatario_id,
      data.ancho,
      data.alto,
      data.largo,
    ]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'La caja no se agregó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'Caja agregada', data: rows[0] });
  } catch (e) {
    console.log(e);

    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al agregar la caja', error_code: e.code });
  }
};

export const delete_caja = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('DELETE FROM caja WHERE id = $1  RETURNING *', [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encontró la caja con ID = ${up_id}` });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'Caja eliminada', data: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al eliminar la caja', error_code: e.code });
  }
};

export const update_caja = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const data = sl.body;
    // Generar datos que se actualizarán (contenido = '...', fragil: false)
    // Según lo recibido en el body
    const str_query = generate_str_of_dict(data, 'certificado');
    const cols_afected = get_keys_dict(data, 'certificado');

    const { rows, rowCount } = await db_conn.query(`UPDATE caja SET ${str_query} WHERE id = $1  RETURNING ${cols_afected}`, [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'La caja no se actualizó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'Caja actualizada', updated_fields: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al actualizar la caja', error_code: e.code });
  }
};
