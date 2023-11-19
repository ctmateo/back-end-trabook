const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = require('./config.js');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = parseInt(DB_PORT, 10);

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectTimeout: 20000,
});

// Manejo de errores de conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
  }
});

app.get('/', (req, res) => {
  const consulta = 'SELECT * FROM cards';
  connection.query(consulta, (error, resultados) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(resultados);
    }
  });
});

app.get('/bestvacation', (req, res) => {
  const consulta = 'SELECT * FROM cards_bestvacation';
  connection.query(consulta, (error, resultados) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(resultados);
    }
  });
});

app.get('/blog', (req, res) => {
  const consulta = 'SELECT * FROM cards_blog';
  connection.query(consulta, (error, resultados) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(resultados);
    }
  });
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});