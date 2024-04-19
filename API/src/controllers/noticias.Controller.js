import { getConnection, sql } from "../database/connection.js";

// Função para obter todas as notícias
export const getNews = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT * FROM Cadastro_Noticia_Categoria");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para criar uma nova notícia
export const createNews = async (req, res) => {
    const {
        titulo_noticia,
        descricao_noticia,
        url_noticia,
        url_imagem_noticia,
        data_inicio_noti,
        data_fim_noti,
        usuario_id_usuario,
        categoria_id_categoria
    } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("titulo_noticia", sql.VarChar(45), titulo_noticia)
            .input("descricao_noticia", sql.VarChar(200), descricao_noticia)
            .input("url_noticia", sql.VarChar(200), url_noticia)
            .input("url_imagem_noticia", sql.VarChar(200), url_imagem_noticia)
            .input("data_inicio_noti", sql.DateTime, data_inicio_noti)
            .input("data_fim_noti", sql.DateTime, data_fim_noti)
            .input("usuario_id_usuario", sql.Numeric(7), usuario_id_usuario)
            .input("categoria_id_categoria", sql.Numeric(7), categoria_id_categoria)
            .query(
                "INSERT INTO Cadastro_Noticia_Categoria (titulo_noticia, descricao_noticia, url_noticia, url_imagem_noticia, data_inicio_noti, data_fim_noti, usuario_id_usuario, categoria_id_categoria) VALUES (@titulo_noticia, @descricao_noticia, @url_noticia, @url_imagem_noticia, @data_inicio_noti, @data_fim_noti, @usuario_id_usuario, @categoria_id_categoria);"
            );

        res.json({
            titulo_noticia,
            descricao_noticia,
            url_noticia,
            url_imagem_noticia,
            data_inicio_noti,
            data_fim_noti,
            usuario_id_usuario,
            categoria_id_categoria,
            id: result.recordset[0].id_noticia,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para obter uma notícia por ID
export const getNewsById = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("SELECT * FROM Cadastro_Noticia_Categoria WHERE id_noticia = @id");

        return res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para deletar uma notícia por ID
export const deleteNewsById = async (req, res) => {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("DELETE FROM Cadastro_Noticia_Categoria WHERE id_noticia = @id");

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para atualizar uma notícia por ID
export const updateNewsById = async (req, res) => {
    const {
        titulo_noticia,
        descricao_noticia,
        url_noticia,
        url_imagem_noticia,
        data_inicio_noti,
        data_fim_noti,
        usuario_id_usuario,
        categoria_id_categoria
    } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("id", req.params.id)
            .input("titulo_noticia", sql.VarChar(45), titulo_noticia)
            .input("descricao_noticia", sql.VarChar(200), descricao_noticia)
            .input("url_noticia", sql.VarChar(200), url_noticia)
            .input("url_imagem_noticia", sql.VarChar(200), url_imagem_noticia)
            .input("data_inicio_noti", sql.DateTime, data_inicio_noti)
            .input("data_fim_noti", sql.DateTime, data_fim_noti)
            .input("usuario_id_usuario", sql.Numeric(7), usuario_id_usuario)
            .input("categoria_id_categoria", sql.Numeric(7), categoria_id_categoria)
            .query(
                "UPDATE Cadastro_Noticia_Categoria SET titulo_noticia = @titulo_noticia, descricao_noticia = @descricao_noticia, url_noticia = @url_noticia, url_imagem_noticia = @url_imagem_noticia, data_inicio_noti = @data_inicio_noti, data_fim_noti = @data_fim_noti, usuario_id_usuario = @usuario_id_usuario, categoria_id_categoria = @categoria_id_categoria WHERE id_noticia = @id"
            );

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        res.json({
            titulo_noticia,
            descricao_noticia,
            url_noticia,
            url_imagem_noticia,
            data_inicio_noti,
            data_fim_noti,
            usuario_id_usuario,
            categoria_id_categoria,
            id: req.params.id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
