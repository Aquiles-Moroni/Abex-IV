import sql from 'mssql';

// Configurações do banco de dados
// const dbConfig = {
//     user: 'sa',
//     password: '**Senh4**',
//     server: 'localhost:1433',
//     database: 'retro',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//     },
// };

const dbConfig = {
    user: 'sa',
    password: '**Senh4**',
    server: 'localhost',
    port: 1433,
    database: 'retro',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};


// Função para obter conexão com o banco de dados
export const buscarConexao = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('SQL ON:');
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

export { sql }; 