let nome = prompt('Qual é o seu nome?')

const nomeUsuario = { name: nome }
let batePapo = document.querySelector('.chat')
const mensagemDigitada = document.querySelector('.text')
verificarUsuario()

function verificarUsuario() {
  const resposta = axios.post(
    'https://mock-api.driven.com.br/api/v6/uol/participants',
    nomeUsuario
  )
  resposta.then(usuarioVerificado)
}

function mantendoConexao(){
  const manterConexao = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario)
  manterConexao.then()
  manterConexao.catch()
}


function respostaChegou(resposta) {
  let batePapo = document.querySelector('.chat')
  batePapo.innerHTML = ''
  for (let i = 0; i < 100; i++) {
    let hora = resposta.data[i].time
    let nome1 = resposta.data[i].from
    let nome2 = resposta.data[i].to
    let texto = resposta.data[i].texto
    let tipo = resposta.data[i].type

    if (tipo === 'status' || tipo === 'message' ){


      batePapo.innerHTML += `
      
      <div data-test="message" class="${tipo}">
          (${hora}) ${nome1} para ${nome2}: ${texto}
      </div> <!-- fechamento entra na sala -->
  
      `;
  }

      if (tipo === 'private_message' && (nome1 === nome || nome2 === nome)){


      batePapo.innerHTML += `
      
      <div data-test="message" class="${tipo}">
          (${hora}) ${nome1} para ${nome2}: ${texto}
      </div> <!-- fechamento entra na sala -->
  
      `;
  }
}
  batePapo.querySelector('div:last-child').scrollIntoView()
}

function pegarConversaNoServidor() {
  const promessa = axios.get(
    'https://mock-api.driven.com.br/api/v6/uol/messages'
  )

  promessa.then(respostaChegou)
  promessa.catch(erro)
}

function enviarMensagem(){

  const msg = {
      from: nome,
      to: "Todos",
      text: mensagemDigitada.value,
      type: "message" 
  }

  const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

  mensagemDigitada.value=""

  enviar.then(pegarConversaNoServidor);
  enviar.catch(erro);
}

function usuarioVerificado (){
  pegarConversaNoServidor()
  setInterval(function (){ 
      pegarConversaNoServidor()
  } ,3000)
  
  setInterval(mantendoConexao, 5000);
}

  function pegarConversaNoServidor(){

    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promessa.then(respostaChegou);
    promessa.catch(erro);
}

function enviarMensagem(){


    const msg = {
        from: nome,
        to: "Todos",
        text: mensagemDigitada.value,
        type: "message" 
    }

    const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

    mensagemDigitada.value = "";

    enviar.then(pegarConversaNoServidor);
    enviar.catch(erro);
}

function erro (erro){
  window.location.reload();
}



