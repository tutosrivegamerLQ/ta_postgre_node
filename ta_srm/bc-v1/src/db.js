import pg from 'pg';

// Variables de entorno
const ENV = process.env;

// Conexión a la base de datos
const db_conn = new pg.Pool({
  user: ENV.DB_USER,
  PORT: ENV.DB_PORT,
  password: ENV.DB_PASS,
  host: ENV.DB_HOST,
  database: ENV.DB_NAME,
  sslmode: "disable",
});

export default db_conn;
