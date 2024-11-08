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
  let score = 0;
  let startTime;
  let interval;
  
  function startGame() {
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    startTime = new Date();
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    updateProgress();
    showQuestion();
    startTimer();
  }
  
  function showQuestion() {
    if (currentQuestionIndex < selectedQuestions.length) {
      const question = selectedQuestions[currentQuestionIndex];
      const questionContainer = document.getElementById('question-container');
  
      // Dividindo o texto para obter premissas e conclusão corretamente
      const parts = question.text.split(/Premissa 2:|Conclusão:/);
  
      questionContainer.innerHTML = `
        <p><strong>Premissa 1:</strong> ${parts[0].replace("Premissa 1:", "").trim()}</p>
        <p><strong>Premissa 2:</strong> ${parts[1].trim()}</p>
        <p><strong>Conclusão:</strong> ${parts[2].trim()}</p>
      `;
      questionContainer.classList.remove('correct-answer', 'wrong-answer');
    } else {
      endGame();
    }
  }
  
  
  function selectAnswer(answer) {
    const question = selectedQuestions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    if (answer === question.answer) {
      score++;
      questionContainer.classList.add('correct-answer');
    } else {
      questionContainer.classList.add('wrong-answer');
    }
    setTimeout(() => {
      currentQuestionIndex++;
      updateProgress();
      showQuestion();
    }, 1000);
  }
  
  function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${(currentQuestionIndex / selectedQuestions.length) * 100}%`;
  }
  
  function startTimer() {
    const timer = document.getElementById('timer');
    interval = setInterval(() => {
      const elapsedTime = Math.floor((new Date() - startTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      timer.textContent = `Tempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
  }
  
  function endGame() {
    clearInterval(interval);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('score').textContent = `Pontuação: ${score} de ${selectedQuestions.length}`;
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById('time').textContent = `Tempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  startGame();
  