const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./config.js');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = parseInt(DB_PORT, 10);

app.use(cors());
app.use(express.json());

// Crea un pool de conexiones
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// No es necesario pool.connect() en este caso

app.get('/', (req, res) => {
  const consulta = 'SELECT * FROM cards';
  // Utiliza el pool para ejecutar consultas
  pool.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.get('/bestvacation', (req, res) => {
  const consulta = 'SELECT * FROM cards_bestvacation';
  // Utiliza el pool para ejecutar consultas
  pool.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.get('/blog', (req, res) => {
  const consulta = 'SELECT * FROM cards_blog';
  // Utiliza el pool para ejecutar consultas
  pool.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.listen(port, () => {
  console.log('corriendo en ', DB_PORT);
});
