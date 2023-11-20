const { DATABASE_URL, DB_USER, DB_PASSWORD } = require('./config.js');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const url = require('url');
const connectionData = url.parse(DATABASE_URL);


const sslQueryParam = new URL(DATABASE_URL).searchParams.get('ssl');
const ssl = sslQueryParam ? JSON.parse(sslQueryParam) : null;


const connectionConfig = {
  host: connectionData.hostname,
  user: DB_USER,  
  password: DB_PASSWORD,  
  database: connectionData.pathname.replace('/', ''),
  port: connectionData.port,
  ssl: ssl,
};

const pool = mysql.createPool({
  ...connectionConfig,
  ssl: ssl ? { ...ssl, rejectUnauthorized: false } : null,
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
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
  console.log('Ejecutado en el puerto ', port);
});