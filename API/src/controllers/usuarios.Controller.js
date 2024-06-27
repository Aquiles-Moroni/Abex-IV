import { buscarConexao } from "../database/conexaoBanco.js";
import jwt from 'jsonwebtoken';
const segredo = 'Senh4';

// export const buscarUsuario = async (req, res) => {
//     const { nome_usuario, senha_usuario } = req.body;

//     try {
//         // Verificar as credenciais do usuário no banco de dados
//         const pool = await buscarConexao();
//         const result = await pool.query("SELECT * FROM Usuario WHERE nome_usuario = $1 AND senha_usuario = $2", [nome_usuario, senha_usuario]);

//         // Se as credenciais estiverem corretas, gerar um token JWT
//         if (result.rows.length > 0) {
//             const usuario = result.rows[0];
//             const token = jwt.sign({ id: usuario.id_usuario, nome_usuario: usuario.nome_usuario, tipo_usuario: usuario.tipo_usuario }, segredo, { expiresIn: '1h' });

//             return res.json({ auth: true, token });
//         } else {
//             return res.status(401).json({ auth: false, message: "Credenciais inválidas" });
//         }
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };



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
            .json({ message: "Preencha todos os dados!" });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool.query(
            "INSERT INTO Usuario (nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario",
            [nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario]
        );

        const userId = result.rows[0].id_usuario;

        res.json({
            nome_completo_usuario,
            nome_usuario,
            senha_usuario,
            tipo_usuario,
            data_nasc_usuario,
            telefone_usuario,
            id: userId,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await buscarConexao();

        const result = await pool.query("SELECT * FROM Usuario WHERE id_usuario = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};








// export const atualizarUsuarioPorId = async (req, res) => {
//     const { id } = req.params;
//     const {
//         nome_completo_usuario,
//         nome_usuario,
//         senha_usuario,
//         tipo_usuario,
//         data_nasc_usuario,
//         telefone_usuario
//     } = req.body;

//     if (
//         nome_completo_usuario == null ||
//         nome_usuario == null ||
//         senha_usuario == null ||
//         tipo_usuario == null ||
//         data_nasc_usuario == null ||
//         telefone_usuario == null
//     ) {
//         return res
//             .status(400)
//             .json({ message: "erro" });
//     }

//     try {
//         const pool = await buscarConexao();
//         const result = await pool.query(
//             "UPDATE Usuario SET nome_completo_usuario = $1, nome_usuario = $2, senha_usuario = $3, tipo_usuario = $4, data_nasc_usuario = $5, telefone_usuario = $6 WHERE id_usuario = $7",
//             [nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario, id]
//         );

//         if (result.rowCount === 0) {
//             return res.status(404).json({ message: "Usuário não encontrado" });
//         }

//         res.json({
//             nome_completo_usuario,
//             nome_usuario,
//             senha_usuario,
//             tipo_usuario,
//             data_nasc_usuario,
//             telefone_usuario,
//             id,
//         });
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// export const deletarUsuarioPorId = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const pool = await buscarConexao();

//         const result = await pool.query("DELETE FROM Usuario WHERE id_usuario = $1", [id]);

//         if (result.rowCount === 0) {
//             return res.status(404).json({ message: "Usuário não encontrado" });
//         }

//         res.sendStatus(204);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// }; 