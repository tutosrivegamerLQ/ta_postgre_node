import { req_get as rg, rd_from_list, rdint } from './helpers.mjs';

const cities = async () => {
  return await rg('http://127.0.0.1:5000/rdcity');
};

export async function rd_user() {
  const data = await rg('https://tests-api-i7wm.onrender.com/profile');
  const city = await cities();
  return {
    nombre: data.name,
    direccion: data.address.slice(0, 13),
    ciudad: city.nombre,
    telefono: `+57 ${rdint(3103362199, 3242432181)}`,
  };
}

export async function rd_id_user() {
  const req = await rg('http://localhost:4500/cliente/');
  return rd_from_list(req.data).id;
}
