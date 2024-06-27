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




app.post('/cadastrarnoticia', (req, res) => {
  const formData = req.body;

  // Verifica se categoria_noticia está presente e não é vazio
  if (!formData.categoria_noticia || formData.categoria_noticia.trim() === '') {
    return res.status(400).json({ success: false, error: 'Categoria de notícia é obrigatória.' });
  }

  // Exemplo de inserção no banco de dados usando pg
  const query = `
    INSERT INTO Cadastro_Noticia_Categoria (titulo_noticia, descricao_noticia, url_noticia, 
        data_inicio_noti, data_fim_noti, categoria_noticia)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [
    formData.titulo_noticia,
    formData.descricao_noticia,
    formData.url_noticia,
    formData.data_inicio_noti,
    formData.data_fim_noti,
    formData.categoria_noticia  // A categoria_noticia agora é tratada como uma string
  ];

  // Exemplo usando pg (PostgreSQL client for Node.js)
  pool.query(query, values)
    .then(result => {
      const insertedNoticia = result.rows[0]; // Assume que apenas uma linha foi inserida

      console.log('Notícia cadastrada com sucesso:', insertedNoticia);
      res.json({ success: true, noticia: insertedNoticia });
    })
    .catch(error => {
      console.error('Erro ao cadastrar notícia:', error);
      res.status(500).json({ success: false, error: error.message });
    });
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
app.get('/Cadastro_Noticia_Categoria', async (req, res) => {
  try {
    const client = await pool.connect();
    const resultt = await client.query('SELECT * FROM Cadastro_Noticia_Categoria');

    // Consulta para buscar dados da tabela Cadastro_Noticia_Categoria com joins para outras tabelas
    const query = `
      SELECT cn.id_usuario, cn.titulo_noticia, cn.descricao_noticia, cn.url_noticia, 
             cn.data_inicio_noti, cn.data_fim_noti, u.nome_usuario, cat.nome_categoria
      FROM Cadastro_Noticia_Categoria cn
      INNER JOIN Usuario u ON cn.usuario_id_usuario = u.id_usuario
      INNER JOIN Categoria cat ON cn.categoria_id_categoria = cat.id_categoria
    `;
    
    const result = await client.query(query);
    client.release();

    console.log(resultt.rows); // Verifique os dados retornados no console

    let htmlResponse = '<table border="1">';
    htmlResponse += '<tr><th>Id</th><th>Título</th><th>Descrição</th><th>URL</th><th>Data Início</th><th>Data Fim</th><th>Usuário</th><th>Categoria</th></tr>';

    resultt.rows.forEach(row => {
      htmlResponse += `<tr><td>${row.id_usuario}</td><td>${row.titulo_noticia}</td><td>${row.descricao_noticia}</td><td>${row.url_noticia}</td><td>${row.data_inicio_noti}</td><td>${row.data_fim_noti}</td><td>${row.nome_usuario}</td><td>${row.nome_categoria}</td></tr>`;
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
