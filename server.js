const { DATABASE_URL } = require('./config.js');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const url = require('url');
const connectionData = url.parse(DATABASE_URL);

// Configuración de SSL
const sslQueryParam = new URL(DATABASE_URL).searchParams.get('ssl');
const ssl = sslQueryParam ? JSON.parse(sslQueryParam) : null;



// Obtener el nombre de usuario de la propiedad 'auth' de la URL
const auth = connectionData.auth ? `${connectionData.auth}@` : '';
const connectionConfig = {
  host: connectionData.hostname,
  user: connectionData.auth.split(':')[0],  // Obtener el nombre de usuario
  password: connectionData.auth.split(':')[1],  // Obtener la contraseña
  database: connectionData.pathname.replace('/', ''),
  port: connectionData.port,
  ssl: ssl,
};

// Creación del pool de conexión
const pool = mysql.createPool({
  ...connectionConfig,
  // Añade la siguiente línea para habilitar la conexión segura con SSL/TLS
  ssl: ssl ? { ...ssl, rejectUnauthorized: false } : null,
});

// Obtención de conexión desde el pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
    // Luego de conectar, puedes liberar la conexión
    connection.release();
  }
});

// Rutas de la aplicación
app.get('/', (req, res) => {
  const consulta = 'SELECT * FROM cards';
  pool.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.get('/bestvacation', (req, res) => {
  const consulta = 'SELECT * FROM cards_bestvacation';
  pool.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.get('/blog', (req, res) => {
  const consulta = 'SELECT * FROM cards_blog';
  pool.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

// Inicio del servidor
app.listen(port, "0.0.0.0", () => {
  console.log('Ejecutado en el puerto ', port);
});
