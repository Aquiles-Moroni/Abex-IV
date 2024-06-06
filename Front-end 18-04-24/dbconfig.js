// // dbconfig.js
// const sql = require('mssql');

/*
const config = {
    user: 'sa', // usuário padrão 'sa'
    password: '', // senha em branco, pois não tem senha
    server: 'DESKTOP-JAOA4T9\\SQLEXPRESS', // servidor local
    database: 'Teste_Tech_Cadastro',
    options: {
        trustServerCertificate: true // pode ser necessário definir como true dependendo da configuração do seu servidor SQL Server
    }
};
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