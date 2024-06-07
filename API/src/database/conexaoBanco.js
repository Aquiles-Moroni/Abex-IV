import { Pool } from 'pg';

// Configurações do banco de dados PostgreSQL
const dbConfig = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
};

// Função para obter conexão com o banco de dados
export const buscarConexao = async () => {
    try {
        const pool = new Pool(dbConfig);
        console.log('Conexão com PostgreSQL estabelecida!');
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

export { Pool };