/**
 * Generar claves aleatorias con un límite de caracteres
 * @param {Number} limit Cantidad de caracteres
 */
export function rd_key(limit = 5) {
  let key = '';

  for (let i = 0; i < limit; i++) {
    if (i % 2 === 0) {
      key += int_to_char([rdint(65, 89)]);
    } else {
      key += rdint(0, 9);
    }
  }
  if (key.length > limit) {
    key.slice(0, limit);
  }
  console.log(`KEY: ${key} => Len: ${key.length}`);

  return key;
}

/**
 * Obtener un rango de números
 * @param {Number} start Inicio de rango
 * @param {Number} end Fin de rango
 * @param {Number} step Opcional. Paso del contador
 * @returns Arreglo con cada número del rango
 */
export function get_range_int(start, end, step = 1) {
  const range = [];
  for (let i = start; i < end; i += step) range.push(i);
  return range;
}

/**
 * Convertir enteros (códigos ascii) a caracteres
 * @param {[Number] | Number} codes Códigos que desea convetir
 * @returns Caracter que pertenece al código
 */
export function int_to_char(codes) {
  return String.fromCharCode(...codes);
}

/**
 * Generar un número aleatorio
 * @param {Number} start Incio de rango
 * @param {Number} end Fin de rango
 * @returns Número aleatoro generado
 */
export function rdint(start = 0, end = 0) {
  const range = end - start + 1;
  const rd = Math.floor(start + Math.random() * range);
  return rd;
}

/**
 * Generar un `String` para consultas `UPDATE` de `POSTGRES` (`name = 'Nombre'`)
 * @param {Object} dict Objeto con el cual se trabajará
 * @param {String} restrict Restricción. Por ejemplo el 'id', o 'edad', esto no se agregará al String
 * @returns `String`. Cadena de texto `||` null si no se pasa el `dict`
 */
export function generate_str_of_dict(dict = null, restrict = 'id') {
  if (dict !== null) {
    let str = '';
    for (let par in dict) {
      if (par === restrict) continue;
      typeof dict[par] === 'string' ? (dict[par] = `'${dict[par]}'`) : dict[par];
      str += `${par} = ${dict[par]},`;
    }
    return str.replace(/,$/, '');
  }

  return null;
}

/**
 * Obtener las claves de un diccionario (Objeto)
 * @param {Object} dict Objeto (`{key:value}`)
 * @returns Array. Arreglo con las claves del objeto `||` null, si no se pasa un Objeto
 */
export function get_keys_dict(dict = null, restrict = null) {
  if (dict !== null) {
    let keys = [];
    for (let key in dict) {
      if (key === restrict) continue;
      keys.push(key);
    }
    return keys;
  }
  return null;
}

/**
 * Obtener un elemento aleatorio de una lista
 * @param {*} list
 * @returns
 */
export function rd_from_list(list = []) {
  const index = rdint(0, list.length - 1);
  return list[index];
}

export async function req_get(url) {
  try {
    console.log(`URL => ${url}`);

    let res;
    const req = await fetch(url);

    if (req.ok) {
      res = await req.json();
    } else {
      res = { message: 'No se pudo realizar la solicitud', data: null };
    }

    return res;
  } catch (error) {
    console.error(error);
    return { message: 'No se pudo realizar la solicitud', data: null };
  }
}

export function validate_str(str, len, max) {
  str = str.toUpperCase();
  if (max) {
    if (str.length > len && str.length < max) {
      return true;
    }
  } else {
    if (str.length === len) {
      return true;
    }
  }

  return false;
}

console.log(validate_str('DSHSHDSD', 3, 9));
