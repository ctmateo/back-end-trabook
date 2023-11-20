require('dotenv').config(); 

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(process.env.DATABASE_URL);

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
    if (error) throw error;
    res.json(resultados);
  });
});

app.get('/bestvacation', (req, res) => {
  const consulta = 'SELECT * FROM cards_bestvacation';
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.get('/blog', (req, res) => {
  const consulta = 'SELECT * FROM cards_blog';
  connection.query(consulta, (error, resultados) => {
    if (error) throw error;
    res.json(resultados);
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log('Ejecutado en el puerto ', port);
});