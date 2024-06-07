import { buscarConexao, sql } from "../database/conexaoBanco.js";

// Função para obter todas as categorias
export const buscarCategoria = async (req, res) => {
    try {
        const pool = await buscarConexao();
        const result = await pool.query("SELECT * FROM Categoria");
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    } 
};

// Função para criar uma nova categoria
export const criarCategoria = async (req, res) => {
    const { nome_categoria, descricao_categoria, url_imagem_categoria } = req.body;

    if (!nome_categoria || !descricao_categoria || !url_imagem_categoria) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos." });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool.query(
            "INSERT INTO Categoria (nome_categoria, descricao_categoria, url_imagem_categoria) VALUES ($1, $2, $3) RETURNING *",
            [nome_categoria, descricao_categoria, url_imagem_categoria]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para obter uma categoria por ID
export const buscarCategoriaPorId = async (req, res) => {
    try {
        const pool = await buscarConexao();

        const categoriaId = req.params.id;
        const result = await pool.query("SELECT * FROM Categoria WHERE id_categoria = $1", [categoriaId]);

        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para deletar uma categoria por ID
export const deletarCategoriaPorId = async (req, res) => {
    try {
        const pool = await buscarConexao();

        const categoriaId = req.params.id;
        const result = await pool.query("DELETE FROM Categoria WHERE id_categoria = $1", [categoriaId]);

        if (result.rowCount === 0) return res.sendStatus(404);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para atualizar uma categoria por ID
export const atualizarCategoriaPorId = async (req, res) => {
    const { nome_categoria, descricao_categoria, url_imagem_categoria } = req.body;

    if (!nome_categoria || !descricao_categoria || !url_imagem_categoria) {
        return res.status(400).json({ msg: "Todos os campos devem ser preenchidos." });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool.query(
            "UPDATE Categoria SET nome_categoria = $1, descricao_categoria = $2, url_imagem_categoria = $3 WHERE id_categoria = $4 RETURNING *",
            [nome_categoria, descricao_categoria, url_imagem_categoria, req.params.id]
        );

        if (result.rowCount === 0) return res.sendStatus(404);

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 