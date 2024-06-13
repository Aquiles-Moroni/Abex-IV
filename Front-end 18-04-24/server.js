const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

// Middleware para analisar corpos de solicitação JSON
app.use(express.json());

// Rota para inserir um novo usuário
app.post('/criarConta', async (req, res) => {
  const {
    nome_completo_usuario,
    nome_usuario,
    senha_usuario,
    tipo_usuario,
    data_nasc_usuario,
    telefone_usuario
  } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO usuario (nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario]
    );
    client.release();
    
    res.status(201).json(result.rows[0]); // Retorna o novo usuário inserido
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

// Rota para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM usuario');
    client.release();

    let htmlResponse = '<table border="1">';
    htmlResponse += '<tr><th>Id</th><th>Nome Completo</th><th>Nome de Usuário</th><th>Senha</th><th>Tipo de Usuário</th><th>Data de Nascimento</th><th>Telefone</th></tr>';

    result.rows.forEach(row => {
      htmlResponse += `<tr><td>${row.id_usuario}</td><td>${row.nome_completo_usuario}</td><td>${row.nome_usuario}</td><td>${row.senha_usuario}</td><td>${row.tipo_usuario}</td><td>${row.data_nasc_usuario}</td><td>${row.telefone_usuario}</td></tr>`;
    });

    htmlResponse += '</table>';
    
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlResponse);
  } catch (err) {
    console.error('Erro ao executar a consulta', err);
    res.status(500).send('Erro ao executar a consulta');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});