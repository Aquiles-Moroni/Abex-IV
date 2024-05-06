

export const verificarTipoUsuario = (tipo) => {
    return (req, res, next) => {

        // Verificar se o tipo de usuário está presente nos dados decodificados do token
        if (!req.userData || req.userData.tipo_usuario !== tipo) {
            return res.status(403).json({ message: 'Acesso não autorizado.' });
        }
        next();
    };
};
