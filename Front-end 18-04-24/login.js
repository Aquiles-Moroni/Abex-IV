document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('login');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário por padrão

        // Recupera os valores dos campos do formulário
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Validação do login e senha
        if (username === 'gabriel' && password === '123') {
            console.log('Login bem-sucedido! Redirecionando...');
            window.location.href = 'paginaInicial.html'; // Redireciona para a página inicial em caso de sucesso
        } else {
            alert('Usuário ou senha incorretos. Por favor, tente novamente.'); // Exibe um alerta para o usuário
        }
    });
});