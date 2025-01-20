import db_conn from '../db.js';
import { generate_str_of_dict, get_keys_dict, rd_key, validate_str } from '../helpers/helpers.mjs';
// PARA PRUEBAS
// import { rd_user } from '../helpers/randoms.js';

// Añadir cliente
export const add_client = async (req, res) => {
  try {
    // Objeto body
    const body = req.body;
    // ID aleatorio
    let id_rd;

    if (body.id) {
      if (validate_str(body.id, 5)) {
        id_rd = body.id.toUpperCase();
      }
    } else {
      id_rd = rd_key(5);
    }

    console.log(id_rd);

    const { rows, rowCount } = await db_conn.query('INSERT INTO cliente(id, nombre, direccion, ciudad, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id_rd, body.nombre, body.direccion, body.ciudad, body.telefono]);

    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    // Validar si hubo modificación de filas
    if (rowCount === 0) {
      return res.status(400).json({ message: 'No se pudo agregar el cliente' });
    }

    res.json({ status: res.statusCode, message: 'Cliente agregado', data: rows[0] });
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: 'Error al agregar el cliente', error_code: error.code });
  }
};

// Obtener todos los clientes
export const get_clients = async (req, res) => {
  try {
    const { rows, rowCount } = await db_conn.query('SELECT * FROM cliente;');
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return res.status(404).json({ status: res.statusCode, message: 'No se encontraron clientes' });
    }
    res.json({ status: res.statusCode, message: 'Clientes encontrados', size_data: rowCount, data: rows });
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: 'Error al obtener los clientes', error_code: error.code });
  }
};

// Obtener un cliente
export const get_client = async (req, res) => {
  try {
    const { id } = req.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('SELECT * FROM cliente WHERE id = $1;', [up_id]);
    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return res.status(500).json({ status: res.statusCode, message: `No se encontró el cliente con ID = ${up_id}` });
    }

    res.json({ status: res.statusCode, message: 'Cliente encontrado', data: rows[0] });
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: 'Error al obtener el cliente', error_code: error.code });
  }
};

// Eliminar clientes
export const del_client = async (req, res) => {
  try {
    const { id } = req.params;
    const up_id = id.toUpperCase();
    const { rows, rowCount } = await db_conn.query('DELETE FROM cliente WHERE id = $1 RETURNING *', [up_id]);

    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return res.status(500).json({ status: res.statusCode, message: `No se encontró el cliente con ID = ${up_id}` });
    }

    res.json({ status: res.statusCode, message: 'Cliente eliminado', deleted: rows[0] });
  } catch (error) {
    let message = 'Error al eliminarl el cliente';
    if (error.code === '23503') {
      message = `El cliente tiene <strong>${error.table}s</strong> registrados`;
    }
    res.status(500).json({ message, error_code: error.code });
  }
};

// Actualizar clientes
export const update_client = async (req, res) => {
  try {
    const { id } = req.params;
    const up_id = id.toUpperCase();
    const data = req.body;
    // Generar datos que se actualizarán (contenido = '...')
    // Según lo recibido en el body
    const str_query = generate_str_of_dict(data);
    console.log(data);

    const cols_afected = get_keys_dict(data);
    const { rows, rowCount } = await db_conn.query(`UPDATE cliente SET ${str_query} WHERE id = $1  RETURNING ${cols_afected}`, [up_id]);

    // Capturar errores
    db_conn.on('error', (e) => {
      throw e;
    });

    if (rowCount === 0) {
      return res.status(400).json({ message: 'No se pudo actualizar el cliente' });
    }

    res.json({ status: res.statusCode, message: 'Cliente actualizado', updated_fields: rows[0] });
  } catch (error) {
    res.status(500).json({ status: res.statusCode, message: 'Error al actualizar el cliente', error_code: error.code });
  }
};
