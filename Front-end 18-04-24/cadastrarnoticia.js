document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o formulário de cadastro
    const cadastroNotForm = document.getElementById('cadastroNot');
  
    // Adiciona evento de submissão ao formulário
    cadastroNotForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = {
        titulo_noticia: document.getElementById('titulo_noticia').value,
        url_noticia: document.getElementById('url_noticia').value,
        descricao_noticia: document.getElementById('descricao_noticia').value,
        categoria_noticia: document.getElementById('categoria_noticia').value,
        data_inicio_noti: document.getElementById('data_inicio_noti').value,
        data_fim_noti: document.getElementById('data_fim_noti').value
      };
  
      // Validação da categoria
      if (formData.categoria_noticia === '') {
        alert('Selecione uma categoria para a notícia.');
        return;
      }
  
      // Envia os dados para o servidor
      fetch('http://localhost:3000/cadastrarnoticia', {
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
            alert('Notícia cadastrada com sucesso!');
            window.location.href = 'paginaInicial.html';
          } else {
            console.error('Erro:', data.error);
            alert('Erro ao cadastrar notícia.');
          }
        })
        .catch(error => {
          console.error('Erro:', error);
          alert('Erro ao cadastrar notícia.');
        });
    });
  });