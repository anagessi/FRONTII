let formularioAcesso = document.querySelector("form.login");

let emailLogin = document.getElementById("inputEmail");
let senhaLogin = document.getElementById("inputPassword");
let botaoSubmit = document.getElementById("submit");

// VALIDAÇÃO DOS CAMPOS OBRIGATORIOS
const limparCampo = (campo) => {
    if (campo.classList.contains("error")) {
        campo.classList.remove("error");
        campo.nextSibling.remove();
    }
}

const validaCampo = (campo) => {
    if (campo.value === "") {
        //Campo Invalido
        campo.classList.add("error"); 
        const erro = document.createElement("small"); 
        erro.innerText="Campo obrigatório"; 
        campo.after(erro); 
    }
}

emailLogin.addEventListener("keyup", function (event) {
    limparCampo(emailLogin);
})

senhaLogin.addEventListener("keyup", function (event) {
    limparCampo(senhaLogin);
})

const validaCampoPagina = (campoPagina) => {
    campoPagina.addEventListener("blur", function (event) {
        limparCampo(campoPagina);
        validaCampo(campoPagina);
    });
}

validaCampoPagina(emailLogin);
validaCampoPagina(senhaLogin);


botaoSubmit.addEventListener("click", function(evento) {

    evento.preventDefault();

    const loginUsuario = {
        email: emailLogin.value,
        password: senhaLogin.value
    };

    if(emailLogin.value === "" || senhaLogin.value === "" ) {

        //VALIDAÇÃO DOS CAMPOS OBRIGATORIOS
        limparCampo(emailLogin);
        limparCampo(senhaLogin);

        validaCampo(emailLogin);
        validaCampo(senhaLogin);

    } else {

        //LOGIN DO USUARIO

        const url = "https://ctd-todo-api.herokuapp.com/v1/users/login";

        const promessa = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUsuario)
        });
        
        promessa.then(function(resposta){
            return resposta.json()
        }).then(function(data){
            console.log(data);
            const token = data.jwt;
            if (token) {
                localStorage.setItem("token", token);
                window.location.href = "tarefas.html";
            } else {
                alert('Não rolou!');
            }
        }).catch(function(erro){
            console.log(erro); 
        });

    }
})

