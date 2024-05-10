document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("entrar").addEventListener("click", function(event) {
        event.preventDefault(); // Evita que o formulário seja submetido normalmente
        
        // Captura os valores dos campos
        var nome = document.getElementById("nome").value;
        var sobrenome = document.getElementById("sobrenome").value;
        var telefone = document.getElementById("telefone").value;
        var senha = document.getElementById("senha").value;
        var confirmarSenha = document.getElementById("confirmarSenha").value;

        // Verifica se as senhas coincidem
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return; // Aborta o processo se as senhas não coincidirem
        }

        // Crie um objeto com os dados capturados
        var dados = {
            nome: nome,
            sobrenome: sobrenome,
            telefone: telefone,
            senha: senha
        };

        // Aqui você pode enviar os dados para o backend
        // Você pode usar fetch() ou XMLHttpRequest para isso

        // Exemplo com fetch()
        fetch('url_do_seu_backend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            // Aqui você pode redirecionar o usuário para outra página após o cadastro ser concluído
            // window.location.href = "pagina_de_sucesso.html";
        })
        .catch((error) => {
            console.error('Erro:', error);
            // Trate erros aqui, como exibir uma mensagem de erro para o usuário
        });
    });
});
