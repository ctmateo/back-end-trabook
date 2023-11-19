const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./config.js');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = parseInt(DB_PORT, 10);

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 30000,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
    // Luego de conectar, puedes liberar la conexión
    connection.release();
  }
});


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

app.listen(port, "0.0.0.0", () => {
  console.log('Ejecutado en el puerto ', DB_PORT);
});
