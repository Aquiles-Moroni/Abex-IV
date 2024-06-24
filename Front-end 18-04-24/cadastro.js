document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Função auxiliar para obter o valor de um campo de formulário
        function getFieldValue(id) {
            const element = document.getElementById(id);
            return element ? element.value : '';
        }

        // Captura os dados do formulário e cria um objeto
        const formData = {
            nome_completo_usuario: getFieldValue('nome_completo_usuario'),
            nome_usuario: getFieldValue('nome_usuario'),
            telefone_usuario: getFieldValue('telefone_usuario'),
            tipo_usuario: getFieldValue('tipo_usuario'),
            data_nasc_usuario: formatarData(getFieldValue('data_nasc_usuario')), // Formate a data aqui
            senha_usuario: getFieldValue('senha_usuario'),
            foto_usuario: getFieldValue('foto_usuario') || 'caminho/padrao/para/imagem.png'
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
                // Salva os dados do usuário em um cookie
                document.cookie = `user=${encodeURIComponent(JSON.stringify(formData))}; path=/`;
                // Redireciona para a página inicial
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
