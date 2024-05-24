document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('login');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário por padrão

        // Recupera os valores dos campos do formulário
        var username = document.getElementById('username').value;
        var sobrenome = document.getElementById('sobrenome').value;
        var telefone = document.getElementById('telefone').value; // Corrigido o ID
        var confirmacaoTelefone = document.getElementById('phone-confirmation').value; // Corrigido o ID

        // Validação dos campos do formulário
        if (username === '' || sobrenome === '' || telefone === '' || confirmacaoTelefone === '') {
            console.log('Por favor, preencha todos os campos.');
            return; // Sai da função se algum campo estiver vazio
        }

        if (telefone !== confirmacaoTelefone) {
            console.log('Os números de telefone não coincidem. Por favor, verifique.');
            alert('Os números de telefone não coincidem. Por favor, verifique!'); // Exibe um alerta para o usuário
            return; // Sai da função se os números de telefone não coincidirem
        }

        // Se todos os campos estiverem preenchidos corretamente, exibe uma mensagem no console
        console.log('Dados do usuário:');
        console.log('Nome:', username);
        console.log('Sobrenome:', sobrenome);
        console.log('Telefone:', telefone); // Corrigido o console.log
        console.log('Telefone de confirmação:', confirmacaoTelefone); // Corrigido o console.log
    });
});
