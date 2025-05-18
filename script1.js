
// Game state variables
let currentPage = "page1";
let difficulty = "";
let gameMode = "";
let currentPlayer = 1;
let playerCount = 2;
let boardSize = 3;
let board = [];
let scores = [0, 0, 0, 0];
let gameActive = true;
let soundEnabled = true;
let musicEnabled = true;
let darkTheme = false;
let language = "en";
let winningCells = [];

// DOM Elements
const pages = {
  page1: document.getElementById("page1"),
  page2: document.getElementById("page2"),
  page3: document.getElementById("page3"),
  page4: document.getElementById("page4"),
  page5: document.getElementById("page5"),
  page6: document.getElementById("page6"),
};

// Audio elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");
const victorySound = document.getElementById("victorySound");
const defeatSound = document.getElementById("defeatSound");

// Initialize the game
function init() {
  loadSettings();
  setupEventListeners();
  createBoard(3);
  createBoard(4);
  applyTranslations();
  updateTextDirection();
  
  if (musicEnabled) {
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch(e => console.log("Music autoplay prevented:", e));
  }
}

function setupEventListeners() {
  document.getElementById("playButton").addEventListener("click", () => navigateTo("page2"));
  document.getElementById("easyBtn").addEventListener("click", () => {
    difficulty = "easy";
    navigateTo("page3");
  });
  document.getElementById("mediumBtn").addEventListener("click", () => {
    difficulty = "medium";
    navigateTo("page4");
  });
  document.getElementById("hardBtn").addEventListener("click", () => {
    difficulty = "hard";
    navigateTo("page4");
  });

  document.getElementById("vsRobotEasy").addEventListener("click", () => startGame("vsRobot", 2, 3));
  document.getElementById("vsPlayerEasy").addEventListener("click", () => startGame("vsPlayer", 2, 3));
  document.getElementById("vsRobotMedium").addEventListener("click", () => startGame("vsRobot", 2, 3));
  document.getElementById("vsPlayerMedium").addEventListener("click", () => startGame("vsPlayer", 2, 3));
  document.getElementById("vs3Players").addEventListener("click", () => startGame("vsPlayer", 3, 4));
  document.getElementById("vs4Players").addEventListener("click", () => startGame("vsPlayer", 4, 4));

  document.getElementById("backButton").addEventListener("click", () => navigateTo("page1"));
  document.getElementById("backButton4x4").addEventListener("click", () => navigateTo("page1"));

  document.querySelectorAll(".settings-icon").forEach(icon => {
    icon.addEventListener("click", openSettings);
  });

  document.querySelectorAll(".user-icon").forEach(icon => {
    icon.addEventListener("click", openUserModal);
  });

  document.querySelector(".close-btn").addEventListener("click", closeSettings);
  document.getElementById("closeUserModal").addEventListener("click", () => {
    document.getElementById("userModal").style.display = "none";
  });

  document.getElementById("soundToggle").addEventListener("change", toggleSound);
  document.getElementById("musicToggle").addEventListener("change", toggleMusic);
  document.getElementById("themeToggle").addEventListener("change", toggleTheme);
  document.getElementById("languageSelect").addEventListener("change", changeLanguage);

  document.getElementById("playAgainButton").addEventListener("click", function() {
    document.getElementById("gameOverModal").style.display = "none";
    document.getElementById("winMessage").classList.add("hidden");
    resetGame(true);
  });
  
  document.getElementById("backToMenuButton").addEventListener("click", () => {
    document.getElementById("gameOverModal").style.display = "none";
    navigateTo("page1");
  });

  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
  });

  window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("settingsModal")) {
      closeSettings();
    }
    if (event.target === document.getElementById("userModal")) {
      document.getElementById("userModal").style.display = "none";
    }
    if (event.target === document.getElementById("gameOverModal")) {
      document.getElementById("gameOverModal").style.display = "none";
    }
  });

  document.addEventListener('click', () => {
    if (musicEnabled && backgroundMusic.paused) {
      backgroundMusic.play().catch((err) => {
        console.warn("Échec de la lecture automatique de la musique :", err);
      });
    }
  }, { once: true });
}

function startGame(mode, count, size) {
  gameMode = mode;
  playerCount = count;
  boardSize = size;
  initGame();
}

function initGame() {
  resetGame(true);
  updatePlayerDisplays();
  navigateTo(boardSize === 3 ? "page5" : "page6");
}

function resetGame(resetScores = false) {
  board = Array(boardSize * boardSize).fill('');
  gameActive = true;
  currentPlayer = 1;
  winningCells = [];
  
  if (resetScores) {
    scores = [0, 0, 0, 0];
  }
  
  const cells = document.querySelectorAll(`.cell[data-size="${boardSize}"]`);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.className = 'cell';
    cell.style.backgroundColor = '';
  });
  
  if (musicEnabled && backgroundMusic.paused) {
    backgroundMusic.play().catch(e => console.log("Music play prevented:", e));
  }
  
  updateCurrentPlayerDisplay();
  updatePlayerDisplays();
}

function createBoard(size) {
  const boardElement = size === 3 ? document.getElementById("gameBoard3x3") : document.getElementById("gameBoard4x4");
  boardElement.innerHTML = '';
  
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.dataset.size = size;
    cell.addEventListener("click", () => handleCellClick(i, size));
    boardElement.appendChild(cell);
  }
}

function handleCellClick(index, size) {
  if (!gameActive || board[index] !== '') return;
  
  playSound("click");
  const symbol = getPlayerSymbol(currentPlayer);
  board[index] = symbol;
  
  const cell = document.querySelector(`.cell[data-index="${index}"][data-size="${size}"]`);
  cell.textContent = symbol;
  cell.classList.add(symbol.toLowerCase());
  
  if (checkWin(symbol, size)) {
    handleWin(currentPlayer, size);
  } else if (checkDraw(size)) {
    handleDraw(size);
  } else {
    currentPlayer = currentPlayer % playerCount + 1;
    updateCurrentPlayerDisplay();
    
    if (gameMode === "vsRobot" && currentPlayer === 2) {
      setTimeout(() => makeRobotMove(size), 500);
    }
  }
}

function checkWin(symbol, size) {
  const required = (playerCount <= 2 && size === 4) ? 4 : 3;
  
  for (let row = 0; row < size; row++) {
    const start = row * size;
    const line = [];
    for (let i = 0; i < size; i++) {
      line.push(board[start + i]);
    }
    if (checkLine(line, symbol, required)) return true;
  }
  
  for (let col = 0; col < size; col++) {
    const line = [];
    for (let i = 0; i < size; i++) {
      line.push(board[col + i * size]);
    }
    if (checkLine(line, symbol, required)) return true;
  }
  
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(board[i * (size + 1)]);
    diag2.push(board[(i + 1) * (size - 1)]);
  }
  
  if (checkLine(diag1, symbol, required)) return true;
  if (checkLine(diag2, symbol, required)) return true;
  
  return false;
}

function checkLine(line, symbol, required) {
  let count = 0;
  
  for (const cell of line) {
    if (cell === symbol) {
      count++;
      if (count >= required) {
        return true;
      }
    } else {
      count = 0;
    }
  }
  return false;
}

function checkDraw(size) {
  return board.every(cell => cell !== '');
}

function handleWin(winningPlayer, size) {
  gameActive = false;
  scores[winningPlayer - 1]++;
  
  if (gameMode === "vsRobot") {
    playSound(winningPlayer === 1 ? "victory" : "defeat");
  } else {
    playSound("win");
    triggerConfetti();
  }
  
  updatePlayerDisplays();
  showGameOverModal(winningPlayer);
}

function handleDraw(size) {
  gameActive = false;
  playSound("draw");
  showGameOverModal(null);
}

function showGameOverModal(winningPlayer) {
  const modal = document.getElementById("gameOverModal");
  const title = document.getElementById("gameOverTitle");
  const message = document.getElementById("gameOverMessage");
  const emoji = document.getElementById("gameEmoji");
  
  title.textContent = translate("gameOver");
  
  if (winningPlayer) {
    if (gameMode === "vsRobot") {
      message.textContent = translate(winningPlayer === 1 ? "youWin" : "youLose");
      emoji.textContent = winningPlayer === 1 ? "😊" : "😢";
    } else {
      message.textContent = translate("playerWins", { player: winningPlayer });
      emoji.textContent = "🎉";
    }
  } else {
    message.textContent = translate("draw");
    emoji.textContent = "🤝";
  }
  
  modal.style.display = "flex";
}

function makeRobotMove(size) {
  if (!gameActive) return;
  
  let moveIndex;
  moveIndex = findWinningMove("O", size);
  
  if (moveIndex === undefined) {
    moveIndex = findWinningMove("X", size);
  }
  
  if (moveIndex === undefined) {
    const available = [];
    for (let i = 0; i < size * size; i++) {
      if (board[i] === '') available.push(i);
    }
    moveIndex = available[Math.floor(Math.random() * available.length)];
  }
  
  board[moveIndex] = "O";
  const cell = document.querySelector(`.cell[data-index="${moveIndex}"][data-size="${size}"]`);
  cell.textContent = "O";
  cell.classList.add("o");
  
  if (checkWin("O", size)) {
    handleWin(2, size);
  } else if (checkDraw(size)) {
    handleDraw(size);
  } else {
    currentPlayer = 1;
    updateCurrentPlayerDisplay();
  }
}

function findWinningMove(symbol, size) {
  for (let i = 0; i < size * size; i++) {
    if (board[i] === '') {
      board[i] = symbol;
      if (checkWin(symbol, size)) {
        board[i] = '';
        return i;
      }
      board[i] = '';
    }
  }
  return undefined;
}

function getPlayerSymbol(player) {
  const symbols = ["X", "O", "△", "#"];
  return symbols[player - 1] || "X";
}

function updateCurrentPlayerDisplay() {
  const symbol = getPlayerSymbol(currentPlayer);
  const text = translate("currentPlayer", { player: currentPlayer, symbol });
  
  if (boardSize === 3) {
    document.getElementById("currentPlayer").textContent = text;
  } else {
    document.getElementById("currentPlayer4x4").textContent = text;
  }
}

function updatePlayerDisplays() {
  updateCurrentPlayerDisplay();
  
  const scoreContainers = [
    { element: boardSize === 3 ? "player1Score" : "player1Score4x4", visible: playerCount >= 1 },
    { element: boardSize === 3 ? "player2Score" : "player2Score4x4", visible: playerCount >= 2 },
    { element: boardSize === 3 ? "player3Score" : "player3Score4x4", visible: playerCount >= 3 },
    { element: boardSize === 3 ? "player4Score" : "player4Score4x4", visible: playerCount >= 4 }
  ];

  scoreContainers.forEach((container, index) => {
    const element = document.getElementById(container.element);
    if (!element) {
      console.error("Élément introuvable:", container.element);
      return;
    }

    if (container.visible) {
      element.classList.remove("hidden");
      const scoreText = translate("playerScore", {
        player: index + 1,
        score: scores[index] || 0
      });
      element.textContent = scoreText;
    } else {
      element.classList.add("hidden");
    }
  });
}

function navigateTo(pageId) {
  playSound("click");
  pages[currentPage].classList.remove("active");
  pages[pageId].classList.add("active");
  currentPage = pageId;
  
  if (pageId === "page1") {
    resetGame(true);
  }
}

function openSettings() {
  playSound("click");
  document.getElementById("settingsModal").style.display = "flex";
}

function openUserModal() {
  playSound("click");
  document.getElementById("userModal").style.display = "flex";
}

function closeSettings() {
  playSound("click");
  document.getElementById("settingsModal").style.display = "none";
  saveSettings();
}

function toggleSound() {
  soundEnabled = document.getElementById("soundToggle").checked;
  saveSettings();
}

function toggleMusic() {
  musicEnabled = document.getElementById("musicToggle").checked;
  if (musicEnabled) {
    backgroundMusic.play().catch(e => console.log("Music play prevented:", e));
  } else {
    backgroundMusic.pause();
  }
  saveSettings();
}

function toggleTheme() {
    darkTheme = themeToggle.checked;
    applyTheme();
    saveSettings();
}

function applyTheme() {
    if (darkTheme) {
        document.body.setAttribute("data-theme", "dark");
        themeLabel.textContent = translate("dark");
    } else {
        document.body.setAttribute("data-theme", "light");
        themeLabel.textContent = translate("light");
    }
}

function changeLanguage() {
  language = document.getElementById("languageSelect").value;
  applyTranslations();
  updateTextDirection();
  saveSettings();
}

function updateTextDirection() {
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

function playSound(type) {
  if (!soundEnabled) return;
  
  const sounds = {
    click: clickSound,
    win: winSound,
    draw: drawSound,
    victory: victorySound,
    defeat: defeatSound
  };
  
  const sound = sounds[type];
  if (sound) {
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Sound play error:", e));
    
    if (type !== "click") {
      const originalVolume = backgroundMusic.volume;
      backgroundMusic.volume = 0.1;
      setTimeout(() => {
        backgroundMusic.volume = originalVolume;
      }, 2000);
    }
  }
}

function triggerConfetti() {
  const confettiSettings = {
    target: 'confettiCanvas',
    max: 150,
    size: 1.5,
    animate: true,
    props: ['circle', 'square', 'triangle', 'line'],
    colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
    clock: 25,
    rotate: true
  };
  
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
  
  setTimeout(() => {
    confetti.clear();
  }, 3000);
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  removeAllErrorMessages();

  const nameIsValid = validateName(name);
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);

  if (nameIsValid && emailIsValid && passwordIsValid) {
    showSuccessMessage();
    setTimeout(() => {
      document.getElementById("userModal").style.display = "none";
    }, 3000);
  }
}

function removeAllErrorMessages() {
  removeErrorMessage('name');
  removeErrorMessage('email');
  removeErrorMessage('password');
}

function createErrorMessageElement(inputId, messageKey) {
  const input = document.getElementById(inputId);
  const errorId = `${inputId}Error`;
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.className = 'error-message';
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }
  
  errorElement.textContent = translate(messageKey);
  return errorElement;
}

function removeErrorMessage(inputId) {
  const errorId = `${inputId}Error`;
  const errorElement = document.getElementById(errorId);
  if (errorElement) errorElement.remove();
}

function validateName(name) {
  const isValid = /^[A-Za-zÀ-ÿ\s\-\_']+$/.test(name);
  if (!isValid) createErrorMessageElement('name', "nameError");
  return isValid;
}

function validateEmail(email) {
  const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  if (!isValid) createErrorMessageElement('email', "emailError");
  return isValid;
}

function validatePassword(password) {
  const isValid = password.length >= 8 &&
                 /[A-Z]/.test(password) &&
                 /[a-z]/.test(password) &&
                 /[0-9]/.test(password) &&
                 /[^A-Za-z0-9]/.test(password);
  if (!isValid) createErrorMessageElement('password', "passwordError");
  return isValid;
}

function showSuccessMessage() {
  const existingSuccess = document.querySelector('.success-message');
  if (existingSuccess) existingSuccess.remove();
  
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  successElement.textContent = translate("registrationSuccess");
  document.getElementById('registerForm').appendChild(successElement);
  setTimeout(() => successElement.remove(), 3000);
}

function saveSettings() {
  const settings = {
    soundEnabled,
    musicEnabled,
    darkTheme,
    language,
    scores
  };
  localStorage.setItem("ticTacToeSettings", JSON.stringify(settings));
}

function loadSettings() {
  const saved = localStorage.getItem("ticTacToeSettings");
  if (saved) {
    const settings = JSON.parse(saved);
    soundEnabled = settings.soundEnabled !== false;
    musicEnabled = settings.musicEnabled !== false;
    darkTheme = settings.darkTheme || false;
    language = settings.language || "en";
    scores = settings.scores || [0, 0, 0, 0];
    
    document.getElementById("soundToggle").checked = soundEnabled;
    document.getElementById("musicToggle").checked = musicEnabled;
    document.getElementById("themeToggle").checked = darkTheme;
    document.getElementById("languageSelect").value = language;
    document.body.classList.toggle("dark-theme", darkTheme);
    document.getElementById("themeLabel").textContent = translate(darkTheme ? "dark" : "light");
    
    if (musicEnabled) {
      backgroundMusic.play().catch(e => console.log("Music autoplay prevented:", e));
    }
  }
}

const translations = {
  en: {
    gameTitle: "Tic Tac Toe",
    play: "Play",
    online: "Online",
    selectDifficulty: "Select Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    selectMode: "Select Game Mode",
    vsRobot: "VS Robot",
    vsPlayer: "2 Players",
    vs3Players: "3 Players",
    vs4Players: "4 Players",
    currentPlayer: "Current: Player {player} ({symbol})",
    playerScore: "Player {player}: {score}",
    settings: "Settings",
    sound: "Sound",
    music: "Music",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    backToMenu: "Back to Menu",
    gameOver: "Game Over",
    playerWins: "Player {player} wins!",
    youWin: "You win!",
    youLose: "You lose!",
    draw: "It's a draw!",
    playAgain: "Play Again",
    register: "Register",
    name: "Name",
    email: "Email",
    password: "Password",
    registerBtn: "Register",
    loginWithFacebook: "Login with Facebook",
    loginWithGoogle: "Login with Google",
    nameError: "Name must contain only letters and symbols. No numbers.",
    emailError: "Email must be a valid @gmail.com address.",
    passwordError: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol.",
    registrationSuccess: "✅ Registration successful!"
  },
  fr: {
    gameTitle: "Morpion",
    play: "Jouer",
    online: "En ligne",
    selectDifficulty: "Sélectionnez la difficulté",
    easy: "Facile",
    medium: "Moyen",
    hard: "Difficile",
    selectMode: "Sélectionnez le mode de jeu",
    vsRobot: "Contre Robot",
    vsPlayer: "2 Joueurs",
    vs3Players: "3 Joueurs",
    vs4Players: "4 Joueurs",
    currentPlayer: "Actuel: Joueur {player} ({symbol})",
    playerScore: "Joueur {player}: {score}",
    settings: "Paramètres",
    sound: "Son",
    music: "Musique",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    language: "Langue",
    backToMenu: "Retour au menu",
    gameOver: "Partie terminée",
    playerWins: "Joueur {player} gagne!",
    youWin: "Vous gagnez!",
    youLose: "Vous perdez!",
    draw: "Match nul!",
    playAgain: "Rejouer",
    register: "S'inscrire",
    name: "Nom",
    email: "Email",
    password: "Mot de passe",
    registerBtn: "S'inscrire",
    loginWithFacebook: "Se connecter avec Facebook",
    loginWithGoogle: "Se connecter avec Google",
    nameError: "Le nom ne doit contenir que des lettres et symboles. Pas de chiffres.",
    emailError: "L'email doit être une adresse @gmail.com valide.",
    passwordError: "Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule, un chiffre et un symbole.",
    registrationSuccess: "✅ Inscription réussie !"
  },
  ar: {
    gameTitle: "إكس-أو",
    play: "لعب",
    online: "أونلاين",
    selectDifficulty: "اختر مستوى الصعوبة",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب",
    selectMode: "اختر نمط اللعب",
    vsRobot: "ضد الروبوت",
    vsPlayer: "لاعبين 2",
    vs3Players: "لاعبين 3",
    vs4Players: "لاعبين 4",
    currentPlayer: "الحالي: اللاعب {player} ({symbol})",
    playerScore: "اللاعب {player}: {score}",
    settings: "الإعدادات",
    sound: "الصوت",
    music: "الموسيقى",
    theme: "المظهر",
    light: "فاتح",
    dark: "غامق",
    language: "اللغة",
    backToMenu: "العودة إلى القائمة",
    gameOver: "انتهت اللعبة",
    playerWins: "اللاعب {player} فاز!",
    youWin: "لقد فزت!",
    youLose: "لقد خسرت!",
    draw: "تعادل!",
    playAgain: "العب مرة أخرى",
    register: "تسجيل",
    name: "الاسم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    registerBtn: "تسجيل",
    loginWithFacebook: "تسجيل الدخول باستخدام فيسبوك",
    loginWithGoogle: "تسجيل الدخول باستخدام جوجل",
    nameError: "يجب أن يحتوي الاسم على أحرف ورموز فقط. لا أرقام مسموحة.",
    emailError: "يجب أن يكون البريد الإلكتروني عنوان @gmail.com صالح.",
    passwordError: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل وتتضمن حرفًا كبيرًا وحرفًا صغيرًا ورقمًا ورمزًا.",
    registrationSuccess: "✅ تم التسجيل بنجاح!"
  }
};

function translate(key, params = {}) {
  let translation = translations[language][key] || translations.en[key] || key;
  for (const param in params) {
    translation = translation.replace(new RegExp(`\\{${param}\\}`, "g"), params[param]);
  }
  return translation;
}

function applyTranslations() {
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translate(key);
  });
  
  document.getElementById("themeLabel").textContent = translate(darkTheme ? "dark" : "light");
  
  if (currentPage === "page5" || currentPage === "page6") {
    updatePlayerDisplays();
  }
}

document.addEventListener("DOMContentLoaded", init);

