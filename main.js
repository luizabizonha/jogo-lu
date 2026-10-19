let playerName = "";
let currentQuestionIndex = 0;
let score = 0;
const pointsPerQuestion = 2;

const storyQuestions = [
  {
    avatar: "🐶",
    narrative: "Toby, o cãozinho guardião, barra o seu caminho: 'Para passar pela floresta, responda! Tenho um saco com 3 bolinhas vermelhas e 2 azuis. Tirei uma bolinha vermelha e NÃO a devolvi. Qual a probabilidade da próxima ser vermelha?'",
    options: [
      { text: "A) 2/4 (ou 50%)", correct: true },
      { text: "B) 3/5 (ou 60%)", correct: false },
      { text: "C) 1/4 (ou 25%)", correct: false }
    ]
  },
  {
    avatar: "🐱",
    narrative: "Mimi, a gatinha astróloga, surge na névoa: 'A probabilidade de chover hoje é 70%. Se chover, a chance de eu usar guarda-chuva é 80%. Qual a probabilidade de chover E eu usar guarda-chuva?'",
    options: [
      { text: "A) 56%", correct: true },
      { text: "B) 70%", correct: false },
      { text: "C) 80%", correct: false }
    ]
  },
  {
    avatar: "🐸",
    narrative: "O Sapo Sábio coaxa na beira do lago: 'Lançamos uma moeda honesta 2 vezes seguidas (Árvore de Probabilidades). Qual a chance de obter pelo menos uma Cara?'",
    options: [
      { text: "A) 1/4 (25%)", correct: false },
      { text: "B) 3/4 (75%)", correct: true },
      { text: "C) 2/4 (50%)", correct: false }
    ]
  },
  {
    avatar: "🐻",
    narrative: "Urso Guardião impede sua passagem: 'Um teste para detectar mel mágico dá positivo em 90% dos casos reais. Porém, dá falso positivo em 5% dos casos sem mel. Se 10% dos potes têm mel, qual a probabilidade de um pote sorteado ter mel sabendo que o teste deu positivo?'",
    options: [
      { text: "A) Aproximadamente 66.7%", correct: true },
      { text: "B) Exatamente 90%", correct: false },
      { text: "C) 50%", correct: false }
    ]
  },
  {
    avatar: "👑",
    narrative: "O Guardião Final de Cristal pergunta: 'Você retira 2 cartas seguidas de um baralho tradicional (52 cartas) COM REPOSIÇÃO. Qual a probabilidade de ambas serem Ases?'",
    options: [
      { text: "A) (4/52) x (3/51)", correct: false },
      { text: "B) (4/52) x (4/52)", correct: true },
      { text: "C) (1/52) x (1/52)", correct: false }
    ]
  }
];

function startGame() {
  const nameInput = document.getElementById("player-name").value.trim();
  if (!nameInput) {
    alert("Por favor, digite seu nome para entrar na aventura!");
    return;
  }

  playerName = nameInput;
  document.getElementById("display-player-name").innerText = `Viajante: ${playerName}`;
  
  switchScreen("screen-login", "screen-game");
  loadQuestion();
}

function switchScreen(fromId, toId) {
  document.getElementById(fromId).classList.remove("active");
  document.getElementById(toId).classList.add("active");
}

function loadQuestion() {
  const q = storyQuestions[currentQuestionIndex];
  
  document.getElementById("character-avatar").innerText = q.avatar;
  document.getElementById("narrative-text").innerText = q.narrative;
  
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerText = option.text;
    btn.onclick = () => selectAnswer(option.correct);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(isCorrect) {
  if (isCorrect) {
    score += pointsPerQuestion;
    document.getElementById("score-display").innerText = `Pontos: ${score}`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < storyQuestions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  switchScreen("screen-game", "screen-end");

  const totalPossible = storyQuestions.length * pointsPerQuestion;
  const endMessage = document.getElementById("end-message");
  const rewardBox = document.getElementById("reward-box");

  if (score === totalPossible) {
    endMessage.innerText = `INCRÍVEL, ${playerName}! Você respondeu todas as perguntas corretamente e acumulou ${score} de ${totalPossible} pontos! O reino da Probabilidade está salvo!`;
    rewardBox.classList.remove("hidden");
  } else {
    endMessage.innerText = `Muito bem, ${playerName}! Você fez ${score} de ${totalPossible} pontos. Com mais um pouco de treino em probabilidade condicional, você conseguirá a recompensa máxima!`;
    rewardBox.classList.add("hidden");
  }
}

function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score-display").innerText = `Pontos: 0`;
  switchScreen("screen-end", "screen-login");
}