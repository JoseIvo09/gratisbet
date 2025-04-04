function verificarSenha() {
    const senha = document.getElementById("senha").value;
    const requisitos = {
        minLength: senha.length >= 8,
        upperCase: /[A-Z]/.test(senha),
        lowerCase: /[a-z]/.test(senha),
        number: /[0-9]/.test(senha),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(senha)
    };

    document.getElementById("requisitoMinLength").className = requisitos.minLength ? "valid" : "invalid";
    document.getElementById("requisitoUpperCase").className = requisitos.upperCase ? "valid" : "invalid";
    document.getElementById("requisitoLowerCase").className = requisitos.lowerCase ? "valid" : "invalid";
    document.getElementById("requisitoNumber").className = requisitos.number ? "valid" : "invalid";
    document.getElementById("requisitoSpecialChar").className = requisitos.specialChar ? "valid" : "invalid";
}

function verificarConfirmacaoSenha() {
    const senha = document.getElementById("senha").value;
    const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;
    const mensagem = document.getElementById("mensagemSenha");

    if (senha !== senhaConfirmacao) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";
    } else {
        mensagem.textContent = "As senhas coincidem.";
        mensagem.style.color = "green";
    }
}

function toggleSenha(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

function redirecionar() {
    const senha = document.getElementById("senha").value;
    const senhaConfirmacao = document.getElementById("senhaConfirmacao").value;

    if (senha !== senhaConfirmacao) {
        alert("As senhas não coincidem. Verifique novamente.");
        return;
    }
    alert("Cadastro realizado com sucesso!");
    window.location.href = "loginn.html";
}