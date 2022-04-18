let chat =  document.querySelector(".chat");

let novaMensagem;
let ultimaMensagem;

function processarResposta(resposta) {
 	console.log(resposta.data);
}
prompt("Qual é o seu nome?");
const objeto = {
    name: nome
};

EnviarDados(objeto);
receberUsuarios();
setInterval(getMensagens, 3000);

function manterConexao() {
    let promessa =  axios.post('https://mock-api.driven.com.br/api/v6/uol/status').
    promessa.then(processarResposta);
    promessa.catch(function stopConnection() {
        clearInterval(interval);
      });
}

function tratarErro(erro) {
    console.log("Status code: " + erro.response.status); // Ex: 404
    console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
}

function receberUsuarios() {
    let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promessa.then(function processarResposta(resposta) {
        console.log(resposta.data);
    });
    promessa.catch(tratarErro);
}

function EnviarDados(objeto) {
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', objeto);
    promessa.then(function processarResposta(resposta) {
        console.log(resposta.data);
    });
    promessa.catch(tratarErro);
    console.log("dados enviados" );
}

function getMensagens() {
    let promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    
    promessa.then(renderizarMensagens);
    promessa.catch(tratarErro);
}

function renderizarMensagens(resposta) {

    let mensagens = document.querySelector(".chat");
    let messages = resposta.data;
    console.log(messages); 

    for (let i = 0; i < messages.length; i++) {

        if (messages[i].type === "message") {
            mensagens.innerHTML +=  `
            <li class="${messages[i].type}">
            <h1>(${messages[i].time})<pre>  </pre></h1>
            <h2>${messages[i].from}</h2>
            para
            <h2>${messages[i].to}:</h2>
            ${messages[i].text}
        </li>`
        
        }
        novaMensagem = document.querySelector("lu:last-child");
        if (novaMensagem.innerHTML !== ultimaMensagem.innerHTML) {
            novaMensagem.scrollIntoView();
            ultimaMensagem = novaMensagem;
        }
    }
}



function enviarMensagem() {
    let texto = document.querySelector("textarea");
    let objMessage = {
      from: objeto.name,
      to: "Todos",
      text: texto.value,
      type: "message",
    };
    const promiseSendMessage = axios.post(
      "https://mock-api.driven.com.br/api/v6/uol/messages",
      objMessage
    );
    texto.value = "";
    promiseSendMessage.catch(errorSendMessage);
  }

  function errorSendMessage(error) {
    alert("Failed to send the message");
  }

