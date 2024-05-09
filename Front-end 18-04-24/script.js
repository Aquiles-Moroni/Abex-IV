document.addEventListener('DOMContentLoaded', function () {
    // Função para inicializar cada slideshow
    function inicializarSlideshow(slideshow) {
        var listaElementos = slideshow.querySelectorAll('.slides .imagem');
        var atual = 0;
        var voltar = slideshow.querySelector('.botao-voltar');
        var proximo = slideshow.querySelector('.botao-proximo');
        var marcadores = slideshow.querySelector('.marcadores');

        // Cria os marcadores de navegação
        for (let i = 0; i < listaElementos.length - marcadores; i++) {
            var div = document.createElement('div');
            div.id = i; // Atribui IDs únicos a cada marcador
            marcadores.appendChild(div);
        }

        // Define a classe 'imgAtual' para o primeiro marcador
        marcadores.children[0].classList.add('imgAtual');

        // Obtém os marcadores de navegação
        var pos = marcadores.querySelectorAll('div');
        console.log(pos);

        // Adiciona eventos de clique aos marcadores de navegação
        for (let i = 0; i < pos.length; i++) {
            pos[i].addEventListener('click', () => {
                atual = parseInt(pos[i].id); // Converte para número
                slide();
            });
        }

        // Adiciona evento de clique ao botão 'voltar'
        voltar.addEventListener('click', () => {
            atual--;
            slide();
        });

        // Adiciona evento de clique ao botão 'próximo'
        proximo.addEventListener('click', () => {
            atual++;
            slide();
        });

        // Função para controlar a exibição dos slides
        function slide() {
            if (atual >= listaElementos.length) {
                atual = 0;
            } else if (atual < 0) {
                atual = listaElementos.length - 1;
            }

            // Oculta todos os slides
            listaElementos.forEach((img) => {
                img.style.display = 'none';
            });

            // Exibe apenas o slide atual
            listaElementos[atual].style.display = 'block';

            // Atualiza a classe dos marcadores de navegação
            pos.forEach((ball) => {
                ball.classList.remove('imgAtual');
            });
            pos[atual].classList.add('imgAtual');
        }

        // Inicia a transição automática entre os slides
        setInterval(() => {
            atual++;
            slide();
        }, 4000);

        // Inicia o slideshow
        slide();
    }

    // Inicializa cada slideshow na página
    document.querySelectorAll('.slide').forEach((slideshow) => {
        inicializarSlideshow(slideshow);
    });
})

document.addEventListener('DOMContentLoaded', function () {
    var buttonEntrar = document.getElementById('entrar');
    var mensagemSucesso = document.getElementById('mensagem-sucesso');

    buttonEntrar.addEventListener('click', function () {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username === 'gabriel' && password === '123') {
            mensagemSucesso.textContent = 'Login bem-sucedido!';
            mensagemSucesso.style.display = 'block';
        } else {
            mensagemSucesso.textContent = ''; // Limpa a mensagem se o login não for bem-sucedido
            alert('Usuário ou senha incorretos. Tente novamente.');
        }
    });
}); 