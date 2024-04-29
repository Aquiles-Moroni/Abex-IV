import { getConnection, sql } from "../database/connection.js";

// Função para obter todos os usuários
export const buscarUsuario = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Usuario");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para criar um novo usuário
export const criarUsuario = async (req, res) => {
    const {
        nome_completo_usuario,
        nome_usuario,
        senha_usuario,
        tipo_usuario,
        data_nasc_usuario,
        telefone_usuario
    } = req.body;

    if (
        nome_completo_usuario == null ||
        nome_usuario == null ||
        senha_usuario == null ||
        tipo_usuario == null ||
        data_nasc_usuario == null ||
        telefone_usuario == null
    ) {
        return res
            .status(400)
            .json({ msg: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("nome_completo_usuario", sql.VarChar, nome_completo_usuario)
            .input("nome_usuario", sql.VarChar, nome_usuario)
            .input("senha_usuario", sql.VarChar, senha_usuario)
            .input("tipo_usuario", sql.Int, tipo_usuario)
            .input("data_nasc_usuario", sql.DateTime, data_nasc_usuario)
            .input("telefone_usuario", sql.VarChar, telefone_usuario)
            .query(
                "INSERT INTO Usuario (nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario) VALUES (@nome_completo_usuario, @nome_usuario, @senha_usuario, @tipo_usuario, @data_nasc_usuario, @telefone_usuario); SELECT SCOPE_IDENTITY() as id"
            );

        res.json({
            nome_completo_usuario,
            nome_usuario,
            senha_usuario,
            tipo_usuario,
            data_nasc_usuario,
            telefone_usuario,
            id: result.recordset[0].id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para obter um usuário por ID
export const buscarUsuarioPorId = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("SELECT * FROM Usuario WHERE id_usuario = @id");

        return res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para deletar um usuário por ID
export const deletarUsuarioPorId = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("DELETE FROM Usuario WHERE id_usuario = @id");

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para atualizar um usuário por ID
export const atualizarUsuarioPorId = async (req, res) => {
    const {
        nome_completo_usuario,
        nome_usuario,
        senha_usuario,
        tipo_usuario,
        data_nasc_usuario,
        telefone_usuario
    } = req.body;

    if (
        nome_completo_usuario == null ||
        nome_usuario == null ||
        senha_usuario == null ||
        tipo_usuario == null ||
        data_nasc_usuario == null ||
        telefone_usuario == null
    ) {
        return res
            .status(400)
            .json({ msg: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("id", req.params.id)
            .input("nome_completo_usuario", sql.VarChar, nome_completo_usuario)
            .input("nome_usuario", sql.VarChar, nome_usuario)
            .input("senha_usuario", sql.VarChar, senha_usuario)
            .input("tipo_usuario", sql.Int, tipo_usuario)
            .input("data_nasc_usuario", sql.DateTime, data_nasc_usuario)
            .input("telefone_usuario", sql.VarChar, telefone_usuario)
            .query(
                "UPDATE Usuario SET nome_completo_usuario = @nome_completo_usuario, nome_usuario = @nome_usuario, senha_usuario = @senha_usuario, tipo_usuario = @tipo_usuario, data_nasc_usuario = @data_nasc_usuario, telefone_usuario = @telefone_usuario WHERE id_usuario = @id"
            );

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        res.json({
            nome_completo_usuario,
            nome_usuario,
            senha_usuario,
            tipo_usuario,
            data_nasc_usuario,
            telefone_usuario,
            id: req.params.id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
