const form = document.getElementById('cadastroNoticiaForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(form);
    
    fetch('http://localhost:3000/cadastrarnoticia', {
        method: 'POST',
        body: formData
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
            alert('Notícia cadastrada com sucesso!');
            // Opcional: redirecionar para outra página após o cadastro
            window.location.href = 'paginaInicial.html';
        } else {
            console.error('Erro:', data.error);
            alert('Houve um erro ao cadastrar a notícia. Por favor, tente novamente.');
        }
    })
    .catch((error) => {
        console.error('Erro ao enviar os dados:', error);
        alert('Houve um erro ao enviar os dados.');
    });
});
