import { json } from 'express';
import db_conn from '../db.js';
import { generate_str_of_dict, rd_key, get_keys_dict } from '../helpers/helpers.mjs';

// Obtener todos los paquetes
export const get_paquetes = async (sl, rs) => {
  try {
    const { rows, rowCount } = await db_conn.query('SELECT * FROM paquete');
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: 'No se encotraron paquetes registrados' });
    }

    rs.json({ status: rs.statusCode, message: 'paquetes encontrados', size_data: rowCount, data: rows });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener los paquetes', error_code: e.code });
  }
};

// Obtener un único paquete
export const get_paquete = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('SELECT * FROM paquete WHERE id = $1', [up_id]);
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encotró el paquete con id = ${up_id}` });
    }

    rs.json({ status: rs.statusCode, message: 'paquete encontrado', data: rows[0] });
  } catch (e) {
    rs.status(500).json({ status: rs.statusCode, message: 'Error al obtener el paquete', error_code: e.code });
  }
};

// Agregar paquete
export const add_paquete = async (sl, rs) => {
  try {
    // ID aleatorio
    const id_rd = rd_key(8);
    const data = sl.body;

    const { rows, rowCount } = await db_conn.query('INSERT INTO paquete(id, fragil, contenido, valor, peso, remitente_id, destinatario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [id_rd, data.fragil, data.contenido, data.valor, data.peso, data.remitente_id, data.destinatario_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'El paquete no se agregó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'paquete agregado', data: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al agregar el paquete', error_code: e.code });
  }
};

export const delete_paquete = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('DELETE FROM paquete WHERE id = $1  RETURNING *', [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(404).json({ status: rs.statusCode, message: `No se encontró el paquete con ID = ${up_id}` });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'paquete eliminado', data: rows[0] });
  } catch (e) {
    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al eliminar el paquete', error_code: e.code });
  }
};

export const update_paquete = async (sl, rs) => {
  try {
    const { id } = sl.params;
    const up_id = id.toUpperCase();
    const data = sl.body;
    console.log(data);

    // Generar datos que se actualizarán (contenido = '...', fragil: false)
    // Según lo recibido en el body
    const str_query = generate_str_of_dict(data, 'certificado');
    const cols_afected = get_keys_dict(data, 'certificado');

    const { rows, rowCount } = await db_conn.query(`UPDATE paquete SET ${str_query} WHERE id = $1 RETURNING ${cols_afected}`, [up_id]);
    // Error
    db_conn.on('error', (e) => {
      throw e;
    });
    // No se agregaron datos (filas afectadas = 0)
    if (rowCount === 0) {
      return rs.status(400).json({ message: 'El paquete no se actualizó' });
    }
    // Éxito
    rs.json({ status: rs.statusCode, message: 'paquete actualizado', updated_fields: rows[0] });
  } catch (e) {
    console.log(e);

    // Error
    rs.status(500).json({ status: rs.statusCode, message: 'Error al actualizar el paquete', error_code: e.code });
  }
};
