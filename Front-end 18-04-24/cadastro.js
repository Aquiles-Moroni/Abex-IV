document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os dados do formulário e cria um objeto
        const formData = {
            nome_completo_usuario: document.getElementById('nome_completo_usuario').value,
            nome_usuario: document.getElementById('nome_usuario').value,
            telefone_usuario: document.getElementById('telefone_usuario').value,
            tipo_usuario: document.getElementById('tipo_usuario').value,
            data_nasc_usuario: formatarData(document.getElementById('data_nasc_usuario').value), // Formate a data aqui
            senha_usuario: document.getElementById('senha_usuario').value
        };

        function formatarData(data) {
            // Ajuste o formato da data conforme necessário
            const dataObj = new Date(data);
            const dia = dataObj.getDate().toString().padStart(2, '0');
            const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // Mês é base 0, então adicione +1
            const ano = dataObj.getFullYear();
            return `${ano}-${mes}-${dia}`;
        }

        // Envia os dados para o servidor usando fetch
        fetch('http://localhost:3000/criarConta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados.');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Sucesso:', data);
                alert('Conta criada com sucesso!');
                // Opcional: redirecionar para outra página após o cadastro
                window.location.href = 'paginaInicial.html';
            } else {
                console.error('Erro:', data.error);
                alert('Houve um erro ao criar a conta. Por favor, tente novamente.');
            }
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Houve um erro ao enviar os dados.');
        });
    });
});
