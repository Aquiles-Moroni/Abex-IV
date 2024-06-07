const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM categoria');
    client.release();
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<table border = 2><tr><td>Id:</td><td>Nome:</td><td>Idade:</td></tr>');
    
    result.rows.forEach(row => {
      res.write(`<tr><td>${row.id}</td><td>${row.nome}</td><td>${row.idade}</td></tr>`);
    });

    res.write('</table>');
    res.end();

  } catch (err) {
    console.error('Erro ao executar a consulta', err);
    res.status(500).send('Erro ao executar a consulta');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 