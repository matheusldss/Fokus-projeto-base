const Html = document.querySelector('html');
const FocoBotao = document.querySelector('.app__card-button--foco');
const CurtoBotao = document.querySelector('.app__card-button--curto');
const LongoBotao = document.querySelector('.app__card-button--longo');
const tempoNatela = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const PlayPauseBotao = document.querySelector('#start-pause');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoBotao = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;
const somPlay = new Audio('sons/play.wav');
const somPause = new Audio('sons/pause.mp3');
const SomFinalizado = new Audio('sons/beep.mp3');
const começarOuPausarBotao = document.querySelector('#start-pause span');
const iconeComeçaePause = document.querySelector('.app__card-primary-butto-icon')
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musicaFocoBotao.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

FocoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    AlterarContexto('foco');
    FocoBotao.classList.add('active');
})

CurtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    AlterarContexto('descanso-curto');
    CurtoBotao.classList.add('active');
})

LongoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    AlterarContexto('descanso-longo');
    LongoBotao.classList.add('active');
})



function AlterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    Html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Descanse um pouco.</strong>
            `;
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar a superfície,<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        SomFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
}

PlayPauseBotao.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play();
        começarOuPausarBotao.textContent = 'Começar';
        zerar();
    } else {
        intervaloId = setInterval(contagemRegressiva, 1000);
        começarOuPausarBotao.textContent = 'Pausar';
        somPlay.play();
    }
    trocarIcone();
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

function trocarIcone() {
    if (começarOuPausarBotao.textContent === 'Começar') {
        iconeComeçaePause.src = 'imagens/play_arrow.png'; 
    } else {
        iconeComeçaePause.src = 'imagens/pause.png'; 
    }
}
function mostrarTempo(params) {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000  );
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoNatela.innerHTML = `${tempoFormatado}`
}
mostrarTempo();