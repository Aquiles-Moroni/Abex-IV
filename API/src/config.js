import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_USER = process.env.DB_USER || "postgres"; // Alterado para o usuário do PostgreSQL
export const DB_PASSWORD = process.env.DB_PASSWORD || "postgres"; // Alterado para a senha do PostgreSQL
export const DB_SERVER = process.env.DB_SERVER || "localhost"; // Removido o número de porta, já que o PostgreSQL usa a porta padrão 5432
export const DB_PORT = process.env.DB_PORT || 5432; // Adicionado o número da porta do PostgreSQL
export const DB_DATABASE = process.env.DB_DATABASE || "postgres"; 