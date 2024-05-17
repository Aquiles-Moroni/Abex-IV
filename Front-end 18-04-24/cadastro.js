document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Validação personalizada (se necessário)
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        // Captura os dados do formulário e cria um objeto
        const formData = {
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            senha: senha
        };

        console.log('Dados do Formulário como Objeto:', formData);

        // Envia os dados para o servidor usando fetch
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
            alert('Dados enviados com sucesso!');
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Houve um erro ao enviar os dados.');
        });

        // Opcional: redirecionar para outra página
        const proximaPagina = 'categoria.html'; // URL da próxima página
        // window.location.href = proximaPagina;
    });
});
