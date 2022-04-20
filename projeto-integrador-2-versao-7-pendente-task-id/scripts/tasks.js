const urltasks = "https://ctd-todo-api.herokuapp.com/v1/tasks";
const urlGetMe = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";
const token = localStorage.getItem("token");

//OBETR NOME DO USUÁRIO E INSERIR NO CABEÇALHO DA PAGINA
const promessaUsuario = fetch(urlGetMe, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'authorization': token 
    }
});

promessaUsuario.then(function(resposta){
    return resposta.json()
}).then(function(usuario){
    const elemento = document.querySelector(".user-name");
    elemento.innerHTML = `${usuario.firstName} ${usuario.lastName}`;
})

//OBTER TAREFAS DO USUARIO

// Listar tarefas

const obterLista = function () {

const promessaLista = fetch(urltasks, {
    method: 'GET',    
    headers: {
        'Content-Type': 'application/json',
        'authorization': token
    }
});

promessaLista.then(function(resposta){
    return resposta.json()
}).then((tarefas) => {
    console.log(tarefas);
    if(tarefas.lenght === 0) {
        document.querySelector(".tarefas-pendentes")
        .innerHTML = `<li> Nenhuma tarefa para exibir aqui :( </li>`;
    } else {

        document.querySelector(".tarefas-pendentes").innerHTML = "";
        tarefas.forEach(function (tarefa) {

            const li = document.createElement("li");
            li.className='tarefa';
            
            const div1 = document.createElement("div");
            div1.className='not-done';
            li.appendChild(div1);
            
            const div2 = document.createElement("div");
            div2.className='descricao';
            
            li.appendChild(div2);

            const p1 = document.createElement("p");
            p1.className='nome';

            div2.appendChild(p1);

            const description = document.createTextNode(tarefa.description);
            p1.appendChild(description);

            const p2 = document.createElement("p");
            p2.className='timestamp';

            div2.appendChild(p2);
           
            const tempo = document.createTextNode(new Date(tarefa.createdAt));
            p2.appendChild(tempo);
            
            div1.onclick = function () {

                const dadosTarefaTrue = {
                    description: tarefa.description,
                    completed: true
                };
                
                const p3 = document.createElement("p");
                p3.className='voltar';
                const txtVoltar = document.createTextNode('Voltar');

                const promessaEditar = fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify(dadosTarefaTrue)
                });
                
                 promessaEditar.then(function(resposta){
                    return resposta.json()
                })

                div2.appendChild(p3);
                p3.appendChild(txtVoltar);

                
                document.querySelector(".tarefas-terminadas").appendChild(li);
                li.removeChild(div1);

                p3.onclick = function () {
                    document.querySelector(".tarefas-pendentes").appendChild(li);
                    li.appendChild(div1);
                    li.removeChild(div2);
                    li.appendChild(div2);
                  
                    div2.removeChild(p3);

                    const dadosTarefaFalse = {
                        description: tarefa.description,
                        completed: false
                    };

                    const promessaEditar = fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify(dadosTarefaFalse)
                });
                
                 promessaEditar.then(function(resposta){
                    return resposta.json()
                })

                }
    
            };

            if(tarefa.completed === false) {
                document.querySelector(".tarefas-pendentes").appendChild(li);
            }
            else{
                document.querySelector(".tarefas-terminadas").appendChild(li);
                li.removeChild(div1);

                const voltar = document.createElement("p");
                voltar.className='voltar';
                const voltartxt = document.createTextNode('Voltar');
                div2.appendChild(voltar);
                voltar.appendChild(voltartxt);

                voltar.onclick = function () {
                    document.querySelector(".tarefas-pendentes").appendChild(li);
                    div2.removeChild(voltar);
                    li.appendChild(div1);
                    li.removeChild(div2);
                    li.appendChild(div2);

                    const dadosTarefaFalse = {
                        description: tarefa.description,
                        completed: false
                    };

                    const promessaEditar = fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify(dadosTarefaFalse)
                });
                
                 promessaEditar.then(function(resposta){
                    return resposta.json()
                })

                }
            };

            // document.querySelector(".tarefas-pendentes").appendChild(li);


            
        });
    }

});

}

obterLista();



// CRIAR UMA NOVA TAREFA

let novaTarefa = document.getElementById("novaTarefa");
let botao = document.getElementById("submit");

// Enviar tarefas

botao.addEventListener("click", function(evento) {

    const enviarTarefa = {
        description: novaTarefa.value,
        completed: false
    };

    evento.preventDefault();

    const promessaTarefa = fetch (urltasks, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(enviarTarefa)
    });

    promessaTarefa.then(function(resposta){
        return resposta.json()
    }).then(json => obterLista())    //exibir lista
    .catch(err => console.log('Erro de solicitação', err)); // lidar com os erros por catch

});


//ENCERRAR SESSÃO

let finalizarSessao = document.getElementById("closeApp");

finalizarSessao.addEventListener("click", function(evento) {

    evento.preventDefault();

    localStorage.clear();
    window.location.href = "index.html";

});


//TAREFA CONCLUIDA
// const tarefaConcluida = function () {

//     obterLista();

//     const promessaConcluida = fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
//         method: 'GET',
//         path: tarefa.id,
//         headers: {
//             'Content-Type': 'application/json',
//             'authorization': token
//         }
//     });

//     promessaConcluida.then(function(resposta){
//         return resposta.json()
//     }).then(json => console.log(json))    //exibir lista
//     .catch(err => console.log('Erro de solicitação', err)); // lidar com os erros por catch

// }

// tarefaConcluida();


