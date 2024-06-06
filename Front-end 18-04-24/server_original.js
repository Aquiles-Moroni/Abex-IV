// server.js

const express = require('express');

const bodyParser = require('body-parser');
const { sql, poolPromise } = require('./dbconfig'); // Importa a configuração do banco de dados
const app = express();
const port = 3000;
const sql = require('mssql');

/* Funciona o servidor starta:
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
*/

const config = {
    user: 'sa',
    password: '',
    server: 'localhost\\SQLEXPRESS', 
    database: 'Teste_Tech_Cadastro' 
}; 

// const config = {
//     user: 'sa',
//     password: '',
//     server: 'localhost\\SQLEXPRESS', 
//     database: 'Teste_Tech_Cadastro' 
// };

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado ao SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Erro ao conectar ao SQL Server', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise
};


app.use(bodyParser.json());

// Endpoint para receber dados do formulário e salvar no banco de dados
app.post('/register', async (req, res) => {
    try {
        // Extrai os dados do corpo da requisição
        const { nome, sobrenome, telefone, email, senha } = req.body;
        
        // Verifica se os campos estão preenchidos
        if (!nome || !sobrenome || !telefone || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Obtém uma conexão do pool
        const pool = await poolPromise;
        const request = pool.request();

        // Define os parâmetros de entrada
        request.input('Nome', sql.VarChar, nome);
        request.input('Sobrenome', sql.VarChar, sobrenome);
        request.input('Telefone', sql.VarChar, telefone);
        request.input('Email', sql.VarChar, email);
        request.input('Senha', sql.VarChar, senha);

        // Executa a query de inserção
        await request.query(`
            INSERT INTO Usuarios (Nome, Sobrenome, Telefone, Email, Senha)
            VALUES (@Nome, @Sobrenome, @Telefone, @Email, @Senha)
        `);

        res.status(200).json({ message: 'Usuário salvo com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar usuário:', err);
        res.status(500).json({ message: 'Erro ao salvar usuário' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
