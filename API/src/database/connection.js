import sql from 'mssql';

// Configurações do banco de dados
const dbConfig = {
    user: 'seu_usuario',
    password: 'sua_senha',
    server: 'seu_servidor',
    database: 'seu_banco_de_dados',
    options: {
        encrypt: true, // Se estiver usando Azure
        trustServerCertificate: true, // Altere para true em ambiente de desenvolvimento local / certificados autoassinados
    },
};

// Função para obter conexão com o banco de dados
export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

// Exporte o módulo SQL para ser usado em consultas
export { sql };
