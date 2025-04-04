function redirecionar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;

    if (senha !== senhaConfirmacao) {
        alert("As senhas não coincidem. Verifique novamente.");
        return;
    }

    // Criando um objeto para armazenar os dados do usuário
    const usuario = { nome, email, senha };

    // Obtendo a lista de usuários cadastrados (se houver)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificando se o e-mail já está cadastrado
    const emailExistente = usuarios.some(user => user.email === email);
    if (emailExistente) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    // Adicionando o novo usuário
    usuarios.push(usuario);

    // Salvando a lista de usuários no LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "loginn.html";
}

function toggleSenha(id) {
    const input = document.getElementById(id);
    const icon = document.querySelector(`#${id} + .toggle-password`);

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈"; // Ícone de "ocultar"
    } else {
        input.type = "password";
        icon.textContent = "👁️"; // Ícone de "mostrar"
    }
}

// Função para carregar usuários cadastrados na página de login
function carregarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("Usuários cadastrados:", usuarios);
}