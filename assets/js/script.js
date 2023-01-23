let nome = prompt('Qual é o seu nome?')

const nomeUsuario = { name: nome }
let batePapo = document.querySelector('.chat')
const msgDigitada = document.querySelector('.text')
verificandoUsuario()

function verificandoUsuario() {
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
    let nomeA = resposta.data[i].from
    let nomeB = resposta.data[i].to
    let texto = resposta.data[i].text
    let tipo = resposta.data[i].type

    if (tipo === 'status' || tipo === 'message' ){


      batePapo.innerHTML += `
      
      <div data-test="message" class="${tipo}">
          (${hora}) ${nomeA} para ${nomeB}: ${texto}
      </div> 
  
      `;
  }

      if (tipo === 'private_message' && (nomeA === nome || nomeB === nome)){


      batePapo.innerHTML += `
      
      <div data-test="message" class="${tipo}">
          (${hora}) ${nomeA} para ${nomeB}: ${texto}
      </div> 
  
      `;
  }
}
  batePapo.querySelector('div:last-child').scrollIntoView()
}

function Errado(erro){
  window.location.reload()
}

function pegarConversaNoServidor() {
  const promessa = axios.get(
    'https://mock-api.driven.com.br/api/v6/uol/messages'
  )

  promessa.then(respostaChegou)
  promessa.catch(Errado)
}

function enviarMensagem(){

  const msg = {
      from: nome,
      to: "Todos",
      text: msgDigitada.value,
      type: "message" 
  }

  const enviar = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

  msgDigitada.value=""

  enviar.then(pegarConversaNoServidor);
  enviar.catch(Errado);
}

function usuarioVerificado (){
  pegarConversaNoServidor()
  setInterval(function (){ 
      pegarConversaNoServidor()
  } ,3000)
  
  setInterval(mantendoConexao, 5000);
}

document.addEventListener("keypress", function (e){


  if (e.key === "Enter") {

      const btn = document.querySelector('.plane-icon')
      btn.click();
  }
})