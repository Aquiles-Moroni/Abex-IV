document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('login');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário por padrão

        // Recupera os valores dos campos do formulário
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        console.log('Enviando dados de login:', { username, password }); // Verifica os dados enviados

        // Envia os dados de login para o servidor
        fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar os dados de login.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data); // Verifica a resposta do servidor
                if (data.success) {
                    console.log('Login bem-sucedido! Redirecionando...');

                    // Ocultar botões de criar conta e login
                    var botaoCriarConta = document.getElementById('botaoCriarConta');
                    var botaoLogin = document.getElementById('botaoLogin');

                    if (botaoCriarConta) {
                        botaoCriarConta.style.display = 'none';
                    }
                    if (botaoLogin) {
                        botaoLogin.style.display = 'none';
                    }

                    // Redirecionar para a página inicial em caso de sucesso
                    window.location.href = 'paginaInicial.html';
                } else {
                    alert('Usuário ou senha incorretos. Por favor, tente novamente.'); // Exibe um alerta para o usuário
                }
            })
            .catch((error) => {
                console.error('Erro ao enviar os dados de login:', error);
                alert('Houve um erro ao enviar os dados de login.');
            });
    });
});
