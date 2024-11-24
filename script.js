const form = document.querySelector('.player-form');
const playerNameInput = document.getElementById('player-name');
const playerNameDisplay = document.querySelector('.player-name-display');
const gameBoard = document.querySelector('.game-board');
const score = document.querySelector('.score');
const saitama = document.querySelector('.saitama');
const predio = document.querySelector('.predio');
const nuvens = document.querySelector('.nuvens');

let jogoAtivo = false; // Controla se o jogo está rodando
let pontos = 0;

// Função para o Mario pular
const pulo = () => {
    if (!saitama.classList.contains('pulo')) { // Impede múltiplos pulos simultâneos
        saitama.classList.add('pulo');

        setTimeout(() => {
            saitama.classList.remove('pulo');
        }, 500); // Tempo da animação deve corresponder ao CSS
    }
};

// Função para iniciar o jogo
const iniciarJogo = () => {
    jogoAtivo = true;
    score.style.display = 'block'; // Exibir pontuação
    form.style.display = 'none'; // Ocultar formulário

    // Ativar as animações
    predio.style.animationPlayState = 'running';
    nuvens.style.animationPlayState = 'running';

    // Ativar o pulo
    document.addEventListener('keydown', pulo);
};

// Capturar o nome do jogador e iniciar o jogo
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const playerName = playerNameInput.value.trim();

    if (playerName) {
        playerNameDisplay.textContent = playerName; // Exibir nome no saitama
        iniciarJogo(); // Começar o jogo
    }
});

// Atualizar a posição do nome com o Mario
const updatePlayerNamePosition = () => {
    const saitamaRect = saitama.getBoundingClientRect();
    playerNameDisplay.style.left = `${saitamaRect.left}px`;
    playerNameDisplay.style.top = `${saitamaRect.top - 20}px`; // Nome acima do Mario
};

// Pontuação
const atualizarPontuacao = () => {
    if (jogoAtivo) {
        pontos++;
        score.textContent = `Pontuação: ${pontos}`;
    }
};

// Loop principal do jogo
const loop = setInterval(() => {
    if (!jogoAtivo) return; // Não executar o loop se o jogo não começou

    const predioposision = predio.offsetLeft;
    const saitamaposision = +window.getComputedStyle(saitama).bottom.replace('px', '');

    if (predioposision <= 120 && predioposision > 0 && saitamaposision < 85) {
        // Game Over
        jogoAtivo = false;
        predio.style.animationPlayState = 'paused'; 
        nuvens.style.animationPlayState = 'paused';

        predio.style.animation = 'none';
        predio.style.left = `${predioposision}px`;

        saitama.style.animation = 'none';
        saitama.style.bottom = `${saitamaposision}px`;

        saitama.src = '/saitamacareta.jpg';
        saitama.style.width = '800px';
        saitama.style.marginLeft = '50px';
    

        clearInterval(loop); // Parar o loop
    }
}, 10);
//deixa o jogo com a tela responsiva
window.addEventListener('resize', gameBoard);

// Atualizar nome e pontuação
setInterval(updatePlayerNamePosition, 10); // Atualizar posição do nome
setInterval(atualizarPontuacao, 1000); // Incrementar pontuação a cada segundo
