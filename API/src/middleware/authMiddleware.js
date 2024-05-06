import jwt from 'jsonwebtoken';

const segredo = 'Senh4';
const tempoExpiracao = '1h';

export const verificarToken = (req, res, next) => {
    let token = req.headers['authorization'];

    // Verificando se o token começa com "Bearer"
    if (token && token.startsWith('Bearer ')) {
        // Removendo "Bearer " do token
        token = token.slice(7);
    }

    if (!token) {
        return res.status(403).json({ auth: false, message: 'Token não fornecido.' });
    }

    jwt.verify(token, segredo, (err, decoded) => {
        if (err) {
            console.error('Erro ao autenticar o token:', err.message);
            if (err.name === 'Token expirado.') {
                return res.status(401).json({ auth: false, message: 'Token expirado.' });
            }
            return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
        }

        // Adicionando o tipo de usuário ao objeto
        const decodedWithUserType = {
            ...decoded,
            tipo_usuario: decoded.tipo_usuario
        };

        // Se o token for válido, armazene o ID do usuário.
        req.userData = decodedWithUserType;
        console.log('Conteúdo de req.userData:', req.userData);
        next();
    });
};
