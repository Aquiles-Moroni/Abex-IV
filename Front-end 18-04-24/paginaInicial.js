function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', () => {
    const userCookie = getCookie('user');
    if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        document.getElementById('cliente-nome').textContent = `Bem-vindo, ${userData.nome_completo_usuario}`;
        document.getElementById('cliente-logo').style.display = 'block';
        // Remove o cookie após carregar a página
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se há um cookie ou local storage que indica que o usuário está logado
    const userId = localStorage.getItem('userId'); // Supondo que você armazene o userId após o login

    if (userId) {
        // Se houver um userId, significa que o usuário está logado
        document.getElementById('usuario-logado').style.display = 'block'; // Exibe o botão ou ícone do usuário logado
        document.getElementById('botaoLogin').style.display = 'none'; // Oculta o botão de login
    } else {
        // Se não houver userId, o usuário não está logado
        document.getElementById('usuario-logado').style.display = 'none'; // Oculta o botão ou ícone do usuário logado
        document.getElementById('botaoLogin').style.display = 'block'; // Exibe o botão de login
    }

    // Aqui você pode adicionar outras lógicas conforme necessário
});