const questions = [
  { text: "Premissa 1: Todo lógico é inteligente. Premissa 2: Todo morador de Varginha não é inteligente. Conclusão: Todo lógico não mora em Varginha.", answer: "silogismo" },
  { text: "Premissa 1: Todo ser humano é mortal. Premissa 2: Alguns animais são mortais. Conclusão: Alguns animais são seres humanos.", answer: "sofisma" },
  { text: "Premissa 1: Todos os gatos são animais. Premissa 2: Alguns animais são perigosos. Conclusão: Alguns gatos são perigosos.", answer: "sofisma" },
  { text: "Premissa 1: Todos os médicos estudaram medicina. Premissa 2: João é médico. Conclusão: João estudou medicina.", answer: "silogismo" },
  { text: "Premissa 1: Todo peixe vive na água. Premissa 2: Golfinhos vivem na água. Conclusão: Golfinhos são peixes.", answer: "sofisma" },
  { text: "Premissa 1: Toda fruta tem sementes. Premissa 2: A maçã é uma fruta. Conclusão: A maçã tem sementes.", answer: "silogismo" },
  { text: "Premissa 1: Todos os filósofos são pensadores. Premissa 2: Sócrates é filósofo. Conclusão: Sócrates é pensador.", answer: "silogismo" },
  { text: "Premissa 1: Todo carro precisa de combustível. Premissa 2: A bicicleta não precisa de combustível. Conclusão: A bicicleta não é um carro.", answer: "silogismo" },
  { text: "Premissa 1: Todos os pássaros voam. Premissa 2: O avestruz é um pássaro. Conclusão: O avestruz voa.", answer: "sofisma" },
  { text: "Premissa 1: Todas as rosas são flores. Premissa 2: Algumas flores são vermelhas. Conclusão: Algumas rosas são vermelhas.", answer: "sofisma" },
  { text: "Premissa 1: Todo professor ensina. Premissa 2: Ana é professora. Conclusão: Ana ensina.", answer: "silogismo" },
  { text: "Premissa 1: Todos os matemáticos gostam de números. Premissa 2: Pedro é matemático. Conclusão: Pedro gosta de números.", answer: "silogismo" },
  { text: "Premissa 1: Todos os escritores gostam de ler. Premissa 2: Alguns leitores gostam de escrever. Conclusão: Alguns leitores são escritores.", answer: "sofisma" },
  { text: "Premissa 1: Todas as plantas precisam de água. Premissa 2: O cacto é uma planta. Conclusão: O cacto precisa de água.", answer: "silogismo" },
  { text: "Premissa 1: Todas as frutas são doces. Premissa 2: O limão é uma fruta. Conclusão: O limão é doce.", answer: "sofisma" },
  { text: "Premissa 1: Todo animal é mortal. Premissa 2: O ser humano é animal. Conclusão: O ser humano é mortal.", answer: "silogismo" },
  { text: "Premissa 1: Todas as aves têm asas. Premissa 2: O morcego tem asas. Conclusão: O morcego é uma ave.", answer: "sofisma" },
  { text: "Premissa 1: Todos os mamíferos respiram oxigênio. Premissa 2: A baleia é um mamífero. Conclusão: A baleia respira oxigênio.", answer: "silogismo" },
  { text: "Premissa 1: Todo metal é sólido. Premissa 2: O mercúrio é metal. Conclusão: O mercúrio é sólido.", answer: "sofisma" },
  { text: "Premissa 1: Todos os engenheiros estudaram cálculo. Premissa 2: Maria é engenheira. Conclusão: Maria estudou cálculo.", answer: "silogismo" }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let currentPlayer = 1;
let scores = [0, 0];
let startTime;
let interval;
let player1Name = '';
let player2Name = '';
let playerTimes = [0, 0];  // Armazena o tempo de conclusão de cada jogador

// Função para iniciar o quiz do Jogador 1
function startFirstPlayer() {
  player1Name = document.getElementById('player1-name').value;
  player2Name = document.getElementById('player2-name').value;

  if (!player1Name || !player2Name) {
    alert('Por favor, insira os nomes dos dois jogadores.');
    return;
  }

  setupGame();
}

// Configura o jogo inicial (para ambos os jogadores)
function setupGame() {
  selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  currentQuestionIndex = 0;
  scores = [0, 0];
  startTime = new Date();

  document.getElementById('player-name-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('timer').style.display = 'block';  // Mostra o temporizador ao iniciar um novo jogo
  
  updatePlayerDisplay();
  updateProgress();
  showQuestion();
  startTimer();
  document.getElementById('suspense-audio').play();
}

// Atualiza o display do jogador atual
function updatePlayerDisplay() {
  const playerNameDisplay = document.getElementById('player-name-display');
  playerNameDisplay.textContent = currentPlayer === 1 ? `${player1Name}'s Turn` : `${player2Name}'s Turn`;
}

// Exibe a pergunta atual
function showQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    const parts = question.text.split(/Premissa 2:|Conclusão:/);
    questionContainer.innerHTML = `
      <p><strong>Premissa 1:</strong> ${parts[0].replace("Premissa 1:", "").trim()}</p>
      <p><strong>Premissa 2:</strong> ${parts[1].trim()}</p>
      <p><strong>Conclusão:</strong> ${parts[2].trim()}</p>
    `;
    questionContainer.classList.remove('correct-answer', 'wrong-answer');
  } else {
    endCurrentPlayer();
  }
}

// Seleciona a resposta do jogador
function selectAnswer(answer) {
  const question = selectedQuestions[currentQuestionIndex];
  const feedbackContainer = document.getElementById('player-feedback');
  const questionContainer = document.getElementById('question-container');

  if (answer === question.answer) {
    scores[currentPlayer - 1]++;
    feedbackContainer.textContent = `Boa, ${currentPlayer === 1 ? player1Name : player2Name}! Você acertou!`;
    questionContainer.classList.add('correct-answer');
  } else {
    feedbackContainer.textContent = `Concentra, ${currentPlayer === 1 ? player1Name : player2Name}! Resposta incorreta!`;
    questionContainer.classList.add('wrong-answer');
  }

  setTimeout(() => {
    questionContainer.classList.remove('correct-answer', 'wrong-answer');
    feedbackContainer.textContent = '';

    // Se ainda houver perguntas, avançamos; caso contrário, encerramos o jogador
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
      updateProgress();
      showQuestion();
    } else {
      endCurrentPlayer();
    }
  }, 1000);
}

// Atualiza a barra de progresso
function updateProgress() {
  const progress = document.getElementById('progress-bar');
  progress.style.width = `${(currentQuestionIndex / selectedQuestions.length) * 100}%`;
}

// Função para iniciar o temporizador
function startTimer() {
  interval = setInterval(() => {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('timer').textContent = `Tempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// Função para encerrar o quiz do jogador atual
function endCurrentPlayer() {
  clearInterval(interval);
  
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  playerTimes[currentPlayer - 1] = elapsedTime;  // Armazena o tempo de conclusão do jogador atual

  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('results-container').style.display = 'block';

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  document.getElementById('score').textContent = `Pontuação Jogador ${currentPlayer}: ${scores[currentPlayer - 1]}`;
  document.getElementById('time').textContent = `Tempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (currentPlayer === 1) {
    currentPlayer = 2;
    document.getElementById('winner').style.display = 'none'; 
    const startSecondPlayerBtn = document.getElementById('start-second-player-btn');
    startSecondPlayerBtn.style.display = 'block';

    // Garantir que o botão chame a função startSecondPlayer ao ser clicado
    startSecondPlayerBtn.addEventListener('click', startSecondPlayer);
  } else {
    displayFinalResults(); 
  }
}

// Função para iniciar o segundo jogador
function startSecondPlayer() {
  document.getElementById('start-second-player-btn').style.display = 'none';
  document.getElementById('results-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';

  currentQuestionIndex = 0;
  selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
  startTime = new Date();

  updatePlayerDisplay();
  updateProgress();
  showQuestion();
  startTimer();
}

// Função para exibir os resultados finais após o jogador 2 concluir
function displayFinalResults() {
  clearInterval(interval);
  document.getElementById('results-container').style.display = 'none';
  document.getElementById('timer').style.display = 'none';

  const finalResultsContainer = document.createElement('div');
  finalResultsContainer.id = 'final-results';
  finalResultsContainer.innerHTML = `
    <h2>Resultados Finais</h2>
    <p><strong>${player1Name}:</strong> ${scores[0]} pontos, Tempo: ${formatTime(playerTimes[0])}</p>
    <p><strong>${player2Name}:</strong> ${scores[1]} pontos, Tempo: ${formatTime(playerTimes[1])}</p>
    <h3>${determineWinner()}</h3>
    <button onclick="resetQuiz()">Reiniciar Quiz</button>
    `;
  document.body.appendChild(finalResultsContainer);
}

// Função para reiniciar o quiz do início
function resetQuiz() {
  document.getElementById('final-results').remove();
  document.getElementById('player-name-container').style.display = 'block';
  document.getElementById('timer').style.display = 'none';

  clearInterval(interval);

  scores = [0, 0];
  playerTimes = [0, 0];
  currentPlayer = 1;
  currentQuestionIndex = 0;
}


// Formata o tempo em minutos e segundos
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Determina o vencedor com base nos pontos e tempo
function determineWinner() {
  if (scores[0] > scores[1]) {
    return `${player1Name} é o vencedor! 🎉`;
  } else if (scores[1] > scores[0]) {
    return `${player2Name} é o vencedor! 🎉`;
  } else {
    if (playerTimes[0] < playerTimes[1]) {
      return `${player1Name} é o vencedor pelo menor tempo! 🎉`;
    } else if (playerTimes[1] < playerTimes[0]) {
      return `${player2Name} é o vencedor pelo menor tempo! 🎉`;
    } else {
      return 'Empate!';
    }
  }
}
