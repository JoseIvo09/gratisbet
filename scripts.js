function verificarSenha() {
    const senha = document.getElementById("senha").value;
    const requisitos = {
        minLength: senha.length >= 8,
        upperCase: /[A-Z]/.test(senha),
        lowerCase: /[a-z]/.test(senha),
        number: /[0-9]/.test(senha),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(senha)
    };

    Object.entries(requisitos).forEach(([key, isValid]) => {
        const elemento = document.getElementById(`requisito${key.charAt(0).toUpperCase() + key.slice(1)}`);
        if (elemento) elemento.className = isValid ? "valid" : "invalid";
    });
}

function verificarConfirmacaoSenha() {
    const senha = document.getElementById("senha").value;
    const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;
    const mensagem = document.getElementById("mensagemSenha");

    if (!mensagem) return;

    if (senha !== senhaConfirmacao) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";
    } else {
        mensagem.textContent = "As senhas coincidem.";
        mensagem.style.color = "green";
    }
}

function redirecionar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;

    if (senha !== senhaConfirmacao) {
        alert("As senhas não coincidem. Verifique novamente.");
        return;
    }

    if (!nome || !email || !senha) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(user => user.email === email)) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
}

function toggleSenha(id) {
    const input = document.getElementById(id);
    const icon = document.querySelector(`#${id}`).nextElementSibling;

    if (input && icon) {
        input.type = input.type === "password" ? "text" : "password";
        icon.textContent = input.type === "password" ? "👁️" : "🙈";
    }
}

function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("Usuários cadastrados:", usuarios);
}
