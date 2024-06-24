const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

// Middleware para analisar corpos de solicitação JSON e cookies
app.use(express.json());
app.use(cookieParser());

// Configuração do CORS
app.use(cors());

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

// Rota para inserir um novo usuário
app.post('/criarConta', async (req, res) => {
  const {
      nome_completo_usuario,
      nome_usuario,
      telefone_usuario,
      tipo_usuario,
      data_nasc_usuario,
      senha_usuario
  } = req.body;

  console.log('Dados recebidos para criar conta:', req.body); // Verifica os dados recebidos

  try {
      const client = await pool.connect();
      const query = 'INSERT INTO Usuario (nome_completo_usuario, nome_usuario, telefone_usuario, tipo_usuario, data_nasc_usuario, senha_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario';
      const result = await client.query(query, [nome_completo_usuario, nome_usuario, telefone_usuario, tipo_usuario, data_nasc_usuario, senha_usuario]);
      const userId = result.rows[0].id_usuario;
      client.release();

      console.log('ID do usuário criado:', userId); // Verifica o ID do usuário criado

      // Define um cookie com o ID do usuário
      res.cookie('userId', userId, { httpOnly: true });

      res.json({ success: true, userId }); // Retorna o ID do usuário cadastrado
  } catch (err) {
      console.error('Erro ao inserir o usuário', err);
      res.status(500).json({ success: false, error: err.message });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  console.log('Dados recebidos no login:', { username, password }); // Verifica os dados recebidos

  try {
      const client = await pool.connect();
      const query = 'SELECT id_usuario FROM Usuario WHERE nome_usuario = $1 AND senha_usuario = $2';
      const result = await client.query(query, [username, password]);
      client.release();

      if (result.rows.length > 0) {
          const userId = result.rows[0].id_usuario;
          res.json({ success: true, userId });
      } else {
          res.json({ success: false });
      }
  } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ success: false, error: 'Erro ao fazer login.' });
  }
});

// Rota para cadastrar uma nova notícia
app.post('/cadastrarNoticia', upload.single('imagem'), async (req, res) => {
  const { titulo, url, resumo } = req.body;
  const imagem = req.file;

  if (!titulo || !url || !resumo || !imagem) {
      return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios.' });
  }

  try {
      const client = await pool.connect();
      const query = 'INSERT INTO Noticia (titulo, url, resumo, imagem) VALUES ($1, $2, $3, $4) RETURNING id_noticia';
      const result = await client.query(query, [titulo, url, resumo, imagem.filename]);
      client.release();

      res.json({ success: true });
  } catch (error) {
      console.error('Erro ao cadastrar a notícia:', error);
      res.status(500).json({ success: false, error: 'Erro ao cadastrar a notícia.' });
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

// Rota para buscar todas as categorias
app.get('/categorias', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM categoria');
    client.release();

    let htmlResponse = '<table border="1">';
    htmlResponse += '<tr><th>Id</th><th>Nome da Categoria</th></tr>';

    result.rows.forEach(row => {
      htmlResponse += `<tr><td>${row.id_categoria}</td><td>${row.nome_categoria}</td></tr>`;
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
