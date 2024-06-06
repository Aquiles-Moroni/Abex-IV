document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Validação personalizada (se necessário)
        const senha = document.getElementById('senha_usuario').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        // Captura os dados do formulário e cria um objeto
        const formData = {
            nome_completo_usuario: document.getElementById('nome_completo_usuario').value,
            nome_usuario: document.getElementById('nome_usuario').value,
            telefone_usuario: document.getElementById('telefone_usuario').value,
            tipo_usuario: document.getElementById('tipo_usuario').value,
            data_nasc_usuario: document.getElementById('data_nasc_usuario').value,
            senha_usuario: senha
        };

        console.log('Dados do Formulário como Objeto:', formData);

        // Envia os dados para o servidor usando fetch
        fetch('http://localhost:3000/api/criarConta', {
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
