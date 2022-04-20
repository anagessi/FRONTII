//console.log('Teste');

let formularioCadastro = document.querySelector("form.cadastro");

let nomeUsuario = document.getElementById("nome");
let sobrenomeUsuario = document.getElementById("sobrenome");
let emailUsuario = document.getElementById("email");
let senhaUsuario = document.getElementById("senha");
let repetirSenhaUsuario = document.getElementById("repetir_senha");
let botaoEnviar = document.getElementById("enviar");


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

const limpaCampoPagina = (campoPagina) => {
    campoPagina.addEventListener("keyup", function (event) {
        limparCampo(campoPagina);
    });
}

limpaCampoPagina(nomeUsuario);
limpaCampoPagina(sobrenomeUsuario);
limpaCampoPagina(emailUsuario);
limpaCampoPagina(senhaUsuario);
limpaCampoPagina(repetirSenhaUsuario);


const validaCampoPagina = (campoPagina) => {
    campoPagina.addEventListener("blur", function (event) {
        limparCampo(campoPagina);
        validaCampo(campoPagina);
    });
}

validaCampoPagina(nomeUsuario);
validaCampoPagina(sobrenomeUsuario);
validaCampoPagina(emailUsuario);
validaCampoPagina(senhaUsuario);
validaCampoPagina(repetirSenhaUsuario);


botaoEnviar.addEventListener("click", function(evento) {

    evento.preventDefault();

    const dados = {
        firstName: nomeUsuario.value,
        lastName: sobrenomeUsuario.value,
        email: emailUsuario.value,
        password: senhaUsuario.value
    };

    
    if(nomeUsuario.value === "" || sobrenomeUsuario.value === "" || emailUsuario.value === "" || senhaUsuario.value === "" || repetirSenhaUsuario === "") {

        //VALIDAÇÃO DOS CAMPOS OBRIGATORIOS

        limparCampo(nomeUsuario);
        limparCampo(sobrenomeUsuario);
        limparCampo(emailUsuario);
        limparCampo(senhaUsuario);
        limparCampo(repetirSenhaUsuario);
    
        validaCampo(nomeUsuario);
        validaCampo(sobrenomeUsuario);
        validaCampo(emailUsuario);
        validaCampo(senhaUsuario);
        validaCampo(repetirSenhaUsuario);

    } else {

    //VALIDAÇÃO DAS SENHAS

        if (senhaUsuario.value !== repetirSenhaUsuario.value) {
            repetirSenhaUsuario.classList.add("error");
            const erro = document.createElement("small");
            erro.innerText = "As senhas devem ser iguais";
            repetirSenhaUsuario.after(erro);
        } else {

            console.log(dados)

            //CADASTRO DO USUARIO
            const url = "https://ctd-todo-api.herokuapp.com/v1/users";

            const promessa = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
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
    }
});

