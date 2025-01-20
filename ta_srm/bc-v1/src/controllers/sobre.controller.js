//id | fragil | contenido | valor | peso | remitente_id | destinatario_id
import db_conn from '../db.js';
import { generate_str_of_dict, rd_key, get_keys_dict } from '../helpers/helpers.mjs';

// Obtener todos los sobres
export const get_sobres = async (sl, rs) => {
  try {
    const { rows, rowCount } = await db_conn.query('SELECT * FROM sobre');
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: 'No se encotraron sobres registrados' });
    }

    rs.json({ status: rs.statusCode, message: 'sobres encontrados', size_data: rowCount, data: rows });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener los sobres', error_code: e.code });
  }
};

// Obtener un único sobre
export const get_sobre = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('SELECT * FROM sobre WHERE id = $1', [up_id]);
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encotró el sobre con id = ${up_id}` });
    }

    rs.json({ status: rs.statusCode, message: 'sobre encontrado', data: rows[0] });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener el sobre', error_code: e.code });
  }
};

// Agregar sobre
export const add_sobre = async (sl, rs) => {
  try {
    // ID aleatorio
    const id_rd = rd_key(8);
    const data = sl.body;
    console.log(data);

    const { rows, rowCount } = await db_conn.query('INSERT INTO sobre(id, fragil, certificado, contenido, valor, peso, remitente_id, destinatario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [id_rd, false, data.certificado, data.contenido, data.valor, 0, data.remitente_id, data.destinatario_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'El sobre no se agregó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'sobre agregado', data: rows[0] });
  } catch (e) {
    console.log(e);

    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al agregar el sobre', error_code: e.code });
  }
};

export const delete_sobre = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('DELETE FROM sobre WHERE id = $1  RETURNING *', [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encontró el sobre con ID = ${up_id}` });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'sobre eliminado', data: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al eliminar el sobre', error_code: e.code });
  }
};

export const update_sobre = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const data = sl.body;
    if (data.fragil) {
      throw new Error('Un sobre delicado, debe ser registrado como paquete');
    }
    // Generar datos que se actualizarán (contenido = '...')
    // Según lo recibido en el body
    const str_query = generate_str_of_dict(data);
    const cols_afected = get_keys_dict(data);

    const { rows, rowCount } = await db_conn.query(`UPDATE sobre SET ${str_query} WHERE id = $1 RETURNING ${cols_afected}`, [up_id]);
    console.log(rows);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ status: rs.statusCode, message: 'El sobre no se actualizó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'sobre actualizado', updated_fields: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al actualizar el sobre', error_code: e.code });
  }
};
