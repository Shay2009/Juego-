const ampDisplay = document.getElementById('amp-display');
const dangerBar = document.getElementById('danger-bar');
const cableArea = document.getElementById('cable-area');
const connectBtn = document.getElementById('connect-btn');
const gameContainer = document.getElementById('game-container');
const overlay = document.getElementById('overlay');
const resultText = document.getElementById('result-text');

let currentAmps = 0;
let cablesConnected = 0;
const totalCables = 12;
const MAX_AMPS = 15;

// Inicializar cables apagados
for (let i = 0; i < totalCables; i++) {
    const cable = document.createElement('div');
    cable.classList.add('cable');
    cableArea.appendChild(cable);
}

connectBtn.addEventListener('click', () => {
    if (cablesConnected < totalCables) {
        connectCable();
    }
});

function connectCable() {
    const cables = document.querySelectorAll('.cable');
    cables[cablesConnected].classList.add('active');
    cablesConnected++;

    // Lógica Matemática: Cada cable añade una carga aleatoria simulando hardware
    // Simulamos I = V / R donde la resistencia varía
    const addedLoad = Math.random() * 2.5; 
    currentAmps += addedLoad;

    updateUI();
    checkGameState();
}

function updateUI() {
    const displayVal = currentAmps.toFixed(2);
    ampDisplay.innerText = displayVal;

    // Calcular porcentaje para la barra (0 a 15A)
    const percentage = (currentAmps / MAX_AMPS) * 100;
    dangerBar.style.height = `${Math.min(percentage, 100)}%`;

    // Condición de riesgo (Cerca de los 15A)
    if (currentAmps > 10 && currentAmps < 15) {
        gameContainer.classList.add('risk-active');
        document.getElementById('status-display').innerText = "CRÍTICO - BREAKER FALLANDO";
    } else {
        gameContainer.classList.remove('risk-active');
    }
}

function checkGameState() {
    // Perder
    if (currentAmps >= MAX_AMPS) {
        showEndScreen(false);
    } 
    // Ganar
    else if (cablesConnected === totalCables && currentAmps < MAX_AMPS) {
        showEndScreen(true);
    }
}

function showEndScreen(isWin) {
    overlay.classList.remove('hidden');
    
    if (isWin) {
        resultText.innerText = "Congrats!";
        resultText.className = "congrats-text";
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        overlay.classList.add('game-over-screen');
        resultText.innerText = "Game Over";
        resultText.style.fontFamily = "'Creepster', cursive";
        // Efecto simple de splash (sacudida fuerte)
        gameContainer.style.background = "darkred";
    }
    
    connectBtn.disabled = true;
}