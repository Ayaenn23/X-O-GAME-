// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4WtmzgI-Ue8xWpdglgQ3etHSKJ2R4QRo",
    authDomain: "tic-tac-toe-online-b3366.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-online-b3366-default-rtdb.firebaseio.com",
    projectId: "tic-tac-toe-online-b3366",
    storageBucket: "tic-tac-toe-online-b3366.appspot.com",
    messagingSenderId: "600108456209",
    appId: "1:600108456209:web:243eca35089be054a2d4b0",
    measurementId: "G-P6FMSCZ2M4"
};

// Initialiser Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Récupérer les paramètres de l'URL
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("gameId");
const playerSymbol = urlParams.get("player");
const urlLang = urlParams.get("lang");

// Éléments du DOM
const cells = document.querySelectorAll(".cell");
const gameStatus = document.getElementById("gameStatus");
const playerTurn = document.getElementById("playerTurn");
const timerElement = document.getElementById("timer");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");
const rematchBtn = document.getElementById("rematchBtn");
const newMatchBtn = document.getElementById("newMatchBtn");
const quitBtn = document.getElementById("quitBtn");
const matchCount = document.getElementById("matchCount");
const currentGameId = document.getElementById("currentGameId");
const settingsIcon = document.getElementById("settingsIcon");
const userIcon = document.getElementById("userIcon");
const settingsModal = document.getElementById("settingsModal");
const userModal = document.getElementById("userModal");
const closeUserModal = document.getElementById("closeUserModal");
const soundToggle = document.getElementById("soundToggle");
const musicToggle = document.getElementById("musicToggle");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const languageSelect = document.getElementById("languageSelect");
const registerForm = document.getElementById("registerForm");

// Audio elements
const backgroundMusic = document.getElementById("backgroundMusic");
const clickSound = document.getElementById("clickSound");

// Variables d'état
let soundEnabled = true;
let musicEnabled = true;
let darkTheme = false;
let language = urlLang || "fr";

// Traductions
const translations = {
    en: {
        pageTitle: "Game in Progress | Tic Tac Toe Online",
        gameId: "Game ID:",
        match: "Match",
        matchResult: "Match Result",
        waitingForPlayer: "Waiting for second player...",
        gameInProgress: "Game in progress",
        yourTurn: "Your turn",
        opponentTurn: "Opponent's turn",
        timeRemaining: "Time remaining:",
        playerX: "Player X:",
        playerO: "Player O:",
        draws: "Draws:",
        rematch: "Rematch",
        newMatch: "New Match (3 games)",
        quitGame: "Quit Game",
        draw: "It's a draw!",
        playerWins: "Player {player} wins!",
        xWinsMatch: "Player X wins the match {x}-{o}!",
        oWinsMatch: "Player O wins the match {o}-{x}!",
        drawMatch: "Match draw {x}-{o}!",
        confirmQuit: "Quit the game?",
        settings: "Settings",
        sound: "Sound",
        music: "Music",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        language: "Language",
        register: "Register",
        registerBtn: "Register",
        loginWithFacebook: "Login with Facebook",
        loginWithGoogle: "Login with Google",
        nameError: "Name must contain only letters and symbols. No numbers.",
        emailError: "Email must be a valid @gmail.com address.",
        passwordError: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol.",
        registrationSuccess: "✅ Registration successful!",
        gameOver: "Game Over",
        youWin: "You win!",
        youLose: "You lose!",
        playAgain: "Play Again",
        backToMenu: "Back to Menu"
    },
    fr: {
        pageTitle: "Partie en cours | Morpion En Ligne",
        gameId: "Partie ID:",
        match: "Match",
        matchResult: "Résultat du Match",
        waitingForPlayer: "En attente d'un deuxième joueur...",
        gameInProgress: "Partie en cours",
        yourTurn: "À votre tour",
        opponentTurn: "Tour adversaire",
        timeRemaining: "Temps restant:",
        playerX: "Joueur X:",
        playerO: "Joueur O:",
        draws: "Matchs nuls:",
        rematch: "Revanche",
        newMatch: "Nouveau Match (3 parties)",
        quitGame: "Quitter la partie",
        draw: "Match nul!",
        playerWins: "Joueur {player} gagne!",
        xWinsMatch: "Joueur X gagne le match {x}-{o}!",
        oWinsMatch: "Joueur O gagne le match {o}-{x}!",
        drawMatch: "Match nul {x}-{o}!",
        confirmQuit: "Quitter la partie ?",
        settings: "Paramètres",
        sound: "Son",
        music: "Musique",
        theme: "Thème",
        light: "Clair",
        dark: "Sombre",
        language: "Langue",
        register: "S'inscrire",
        registerBtn: "S'inscrire",
        loginWithFacebook: "Se connecter avec Facebook",
        loginWithGoogle: "Se connecter avec Google",
        nameError: "Le nom ne doit contenir que des lettres et symboles. Pas de chiffres.",
        emailError: "L'email doit être une adresse @gmail.com valide.",
        passwordError: "Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule, un chiffre et un symbole.",
        registrationSuccess: "✅ Inscription réussie !",
        gameOver: "Fin partie",
        youWin: "Vous gagnez!",
        youLose: "Vous perdez!",
        playAgain: "Rejouer",
        backToMenu: "Retour au menu"
    },
    ar: {
        pageTitle: "اللعبة قيد التقدم | لعبة إكس-أو أونلاين",
        gameId: "معرف اللعبة:",
        match: "مباراة",
        matchResult: "نتيجة المباراة",
        waitingForPlayer: "في انتظار اللاعب الثاني...",
        gameInProgress: "اللعبة جارية",
        yourTurn: "دورك",
        opponentTurn: "دور الخصم",
        timeRemaining: "الوقت المتبقي:",
        playerX: "اللاعب X:",
        playerO: "اللاعب O:",
        draws: "تعادلات:",
        rematch: "إعادة المباراة",
        newMatch: "مباراة جديدة (3 ألعاب)",
        quitGame: "الخروج من اللعبة",
        draw: "تعادل!",
        playerWins: "اللاعب {player} فاز!",
        xWinsMatch: "اللاعب X يفوز بالمباراة {x}-{o}!",
        oWinsMatch: "اللاعب O يفوز بالمباراة {o}-{x}!",
        drawMatch: "تعادل في المباراة {x}-{o}!",
        confirmQuit: "هل تريد الخروج من اللعبة؟",
        settings: "الإعدادات",
        sound: "الصوت",
        music: "الموسيقى",
        theme: "المظهر",
        light: "فاتح",
        dark: "غامق",
        language: "اللغة",
        register: "تسجيل",
        registerBtn: "تسجيل",
        loginWithFacebook: "تسجيل الدخول باستخدام فيسبوك",
        loginWithGoogle: "تسجيل الدخول باستخدام جوجل",
        nameError: "يجب أن يحتوي الاسم على أحرف ورموز فقط. لا أرقام مسموحة.",
        emailError: "يجب أن يكون البريد الإلكتروني عنوان @gmail.com صالح.",
        passwordError: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل وتتضمن حرفًا كبيرًا وحرفًا صغيرًا ورقمًا ورمزًا.",
        registrationSuccess: "✅ تم التسجيل بنجاح!",
        gameOver: "انتهت اللعبة",
        youWin: "لقد فزت!",
        youLose: "لقد خسرت!",
        playAgain: "العب مرة أخرى",
        backToMenu: "العودة إلى القائمة"
    }
};

// Variables du jeu
let gameRef;
let currentPlayer;
let gameOver = false;
let timer;
let timeLeft = 10;

// Initialisation
if (!gameId || !playerSymbol) {
    alert("Paramètres manquants. Retour à l'accueil...");
    setTimeout(() => (window.location.href = "index2.html"), 2000);
} else {
    loadSettings();
    initGame();
}

// Charger les paramètres
function loadSettings() {
    if (!urlLang) {
        const saved = localStorage.getItem("ticTacToeSettings");
        if (saved) {
            const settings = JSON.parse(saved);
            language = settings.language || "fr";
            soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
            musicEnabled = settings.musicEnabled !== undefined ? settings.musicEnabled : true;
            darkTheme = settings.darkTheme || false;
        }
    }

    // Appliquer les paramètres
    soundToggle.checked = soundEnabled;
    musicToggle.checked = musicEnabled;
    themeToggle.checked = darkTheme;
    languageSelect.value = language;

    // Appliquer le thème
    document.body.classList.toggle("dark-theme", darkTheme);
    themeLabel.textContent = translate(darkTheme ? "dark" : "light");

    // Mettre à jour la direction du texte
    updateTextDirection();

    // Gérer la musique
    if (musicEnabled) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch((e) => console.log("Music autoplay prevented:", e));
    }

    // Appliquer les traductions
    applyTranslations();
}

// Mettre à jour la direction du texte
function updateTextDirection() {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

// Appliquer les traductions
function applyTranslations() {
    // Titre de la page
    document.title = translate("pageTitle");

    // Textes statiques
    document.querySelector("h1").textContent = translate("pageTitle");
    document.querySelector("#gameInfo").innerHTML = `${translate("gameId")} <span id="currentGameId">${gameId}</span>`;
    document.querySelector("#scoreX").parentNode.innerHTML = `${translate("playerX")} <span id="scoreX">0</span>`;
    document.querySelector("#scoreO").parentNode.innerHTML = `${translate("playerO")} <span id="scoreO">0</span>`;
    document.querySelector("#scoreDraw").parentNode.innerHTML = `${translate("draws")} <span id="scoreDraw">0</span>`;

    // Boutons
    rematchBtn.textContent = translate("rematch");
    newMatchBtn.textContent = translate("newMatch");
    quitBtn.textContent = translate("quitGame");

    // Éléments avec attribut data-translate
    document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        el.textContent = translate(key);
    });

    // Réinitialiser les références après modification du DOM
    currentGameId.textContent = gameId;
}

// Fonction de traduction
function translate(key, params = {}) {
    let text = translations[language][key] || key;

    // Remplacer les paramètres
    for (const [param, value] of Object.entries(params)) {
        text = text.replace(`{${param}}`, value);
    }

    return text;
}

function initGame() {
    gameRef = database.ref("games/" + gameId);

    gameRef.once("value").then((snapshot) => {
        if (!snapshot.exists()) {
            alert("Partie non trouvée");
            window.location.href = "index2.html";
            return;
        }

        if (playerSymbol === "O") {
            gameRef.update({ player2: true });
        }

        // Récupérer les paramètres de la partie
        const gameData = snapshot.val();
        if (gameData.settings) {
            soundEnabled = gameData.settings.soundEnabled;
            musicEnabled = gameData.settings.musicEnabled;
            darkTheme = gameData.settings.darkTheme;

            // Mettre à jour les contrôles
            soundToggle.checked = soundEnabled;
            musicToggle.checked = musicEnabled;
            themeToggle.checked = darkTheme;

            // Appliquer le thème
            document.body.classList.toggle("dark-theme", darkTheme);
            themeLabel.textContent = translate(darkTheme ? "dark" : "light");

            // Gérer la musique
            if (musicEnabled) {
                backgroundMusic.volume = 0.5;
                backgroundMusic.play().catch((e) => console.log("Music autoplay prevented:", e));
            } else {
                backgroundMusic.pause();
            }
        }

        // Initialiser les scores s'ils n'existent pas
        if (!gameData.scores) {
            gameRef.update({
                scores: { X: 0, O: 0, draw: 0 },
                matchCompleted: false
            });
        }

        gameRef.on("value", updateGame);
    });

    cells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    rematchBtn.addEventListener("click", () => {
        playSound("click");
        gameRef.update({
            board: ["", "", "", "", "", "", "", "", ""],
            currentPlayer: "X",
            gameOver: false,
            winner: null
        });
        resetTimer();
    });

    newMatchBtn.addEventListener("click", () => {
        playSound("click");
        resetMatch();
    });

    quitBtn.addEventListener("click", () => {
        playSound("click");
        if (confirm(translate("confirmQuit"))) {
            window.location.href = "index2.html";
        }
    });

    document.getElementById("playAgainButton").addEventListener("click", () => {
        playSound("click");
        document.getElementById("gameOverModal").style.display = "none";
        document.getElementById("winMessage").classList.add("hidden");
        gameRef.update({
            board: ["", "", "", "", "", "", "", "", ""],
            currentPlayer: "X",
            gameOver: false,
            winner: null
        });
        resetTimer();
    });

    document.getElementById("backToMenuButton").addEventListener("click", () => {
        playSound("click");
        document.getElementById("gameOverModal").style.display = "none";
        window.location.href = "index2.html";
    });

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === document.getElementById("gameOverModal")) {
            document.getElementById("gameOverModal").style.display = "none";
        }
    });
}

function updateGame(snapshot) {
    const gameData = snapshot.val();
    if (!gameData) {
        alert("Partie supprimée");
        window.location.href = "index2.html";
        return;
    }

    updateBoard(gameData);
    updateScores(gameData);
    checkMatchStatus(gameData);

    if (gameData.gameOver) {
        handleGameOver(gameData);
    } else {
        handleGameInProgress(gameData);
    }
}

function updateBoard(gameData) {
    gameData.board.forEach((cell, index) => {
        cells[index].textContent = cell;
        cells[index].style.color = cell === "X" ? "#e74c3c" : "#3498db";
    });
}

function updateScores(gameData) {
    // Vérifier si les scores existent, sinon les initialiser
    const scores = gameData.scores || { X: 0, O: 0, draw: 0 };
    const totalGames = scores.X + scores.O + scores.draw;
    matchCount.textContent = `${translate("match")} ${totalGames + 1}/3`;

    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

function checkMatchStatus(gameData) {
    const scores = gameData.scores || { X: 0, O: 0, draw: 0 };
    const totalGames = scores.X + scores.O + scores.draw;
    
    if (totalGames >= 3 && !gameData.matchCompleted) {
        displayFinalResult(scores);
        gameRef.update({ matchCompleted: true });
    }
}

function displayFinalResult(scores) {
    clearInterval(timer);
    gameOver = true;
    rematchBtn.style.display = "none";
    newMatchBtn.style.display = "block";

    let winnerText = "";
    if (scores.X > scores.O) {
        winnerText = translate("xWinsMatch", { x: scores.X, o: scores.O });
    } else if (scores.O > scores.X) {
        winnerText = translate("oWinsMatch", { o: scores.O, x: scores.X });
    } else {
        winnerText = translate("drawMatch", { x: scores.X, o: scores.O });
    }

    // Créer la notification de résultat final
    const notification = document.createElement("div");
    notification.className = "final-result-notification";
    notification.innerHTML = `
        <h3>${translate("matchResult")}</h3>
        <p>${winnerText}</p>
        <button id="playAgainAfterMatch">${translate("playAgain")}</button>
    `;
    
    document.body.appendChild(notification);

    // Gérer le clic sur le bouton "Rejouer"
    document.getElementById("playAgainAfterMatch").addEventListener("click", () => {
        playSound("click");
        resetMatch();
        notification.remove();
    });
}

function resetMatch() {
    gameRef.update({
        scores: { X: 0, O: 0, draw: 0 },
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: "X",
        gameOver: false,
        winner: null,
        matchCompleted: false
    });
    
    // Masquer le bouton nouveau match jusqu'à ce que 3 parties soient jouées
    newMatchBtn.style.display = "none";
    // Afficher à nouveau le bouton de revanche
    rematchBtn.style.display = "block";
    resetTimer();
}

function handleGameOver(gameData) {
    gameOver = true;
    clearInterval(timer);
    rematchBtn.style.display = "block";

    if (gameData.winner === "draw") {
        gameStatus.textContent = translate("draw");
        showGameOverModal("draw");
        playSound("draw");
    } else {
        gameStatus.textContent = translate("playerWins", { player: gameData.winner });
        showGameOverModal(gameData.winner);
    }
}

function handleGameInProgress(gameData) {
    gameOver = false;
    currentPlayer = gameData.currentPlayer;
    resetTimer();

    if (!gameData.player2) {
        gameStatus.textContent = translate("waitingForPlayer");
    } else {
        gameStatus.textContent = translate("gameInProgress");
        playerTurn.textContent =
            currentPlayer === playerSymbol
                ? `${translate("yourTurn")} (${playerSymbol})`
                : `${translate("opponentTurn")} (${currentPlayer})`;
    }
}

function handleCellClick(cell) {
    if (gameOver || currentPlayer !== playerSymbol) return;

    playSound("click");
    const index = cell.getAttribute("data-index");

    gameRef.once("value").then((snapshot) => {
        const gameData = snapshot.val();
        if (gameData.board[index] !== "") return;

        const newBoard = [...gameData.board];
        newBoard[index] = playerSymbol;

        const winner = checkWinner(newBoard);
        const isDraw = !winner && newBoard.every((cell) => cell !== "");
        const updates = {
            board: newBoard,
            currentPlayer: playerSymbol === "X" ? "O" : "X",
            gameOver: winner || isDraw
        };

        if (winner || isDraw) {
            updates.winner = winner || "draw";
            const newScores = gameData.scores || { X: 0, O: 0, draw: 0 };
            if (winner === "X") newScores.X++;
            else if (winner === "O") newScores.O++;
            else newScores.draw++;
            updates.scores = newScores;
        }

        gameRef.update(updates);
        resetTimer();
    });
}

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            gameRef.update({
                currentPlayer: currentPlayer === "X" ? "O" : "X"
            });
            resetTimer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = `${translate("timeRemaining")} ${timeLeft}s`;
    timerElement.style.color = timeLeft <= 5 ? "red" : "inherit";
}

function showGameOverModal(winner) {
    const modal = document.getElementById("gameOverModal");
    const title = document.getElementById("gameOverTitle");
    const message = document.getElementById("gameOverMessage");
    const emoji = document.getElementById("gameEmoji");

    title.textContent = translate("gameOver");

    if (winner === "draw") {
        message.textContent = translate("draw");
        emoji.textContent = "🤝";
    } else if (winner) {
        if (winner === playerSymbol) {
            message.textContent = translate("youWin");
            emoji.textContent = "😊";
            playSound("victory");
            triggerConfetti();
        } else {
            message.textContent = translate("youLose");
            emoji.textContent = "😢";
            playSound("defeat");
        }
    }

    modal.style.display = "flex";
}

function triggerConfetti() {
    const confettiSettings = {
        target: "confettiCanvas",
        max: 150,
        size: 1.5,
        animate: true,
        props: ["circle", "square", "triangle", "line"],
        colors: [
            [165, 104, 246],
            [230, 61, 135],
            [0, 199, 228],
            [253, 214, 126]
        ],
        clock: 25,
        rotate: true
    };

    document.getElementById("confettiCanvas").classList.remove("hidden");
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => {
        confetti.clear();
        document.getElementById("confettiCanvas").classList.add("hidden");
    }, 1000);
}

function playSound(type) {
    if (!soundEnabled) return;

    const sounds = {
        click: clickSound,
        win: document.getElementById("winSound"),
        draw: document.getElementById("drawSound"),
        victory: document.getElementById("victorySound"),
        defeat: document.getElementById("defeatSound")
    };

    const sound = sounds[type];
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch((e) => console.log("Sound play error:", e));

        if (type !== "click") {
            const originalVolume = backgroundMusic.volume;
            backgroundMusic.volume = 0.1;
            setTimeout(() => {
                backgroundMusic.volume = originalVolume;
            }, 2000);
        }
    }
}

// Fonctions pour les paramètres
function openSettings() {
    playSound("click");
    settingsModal.style.display = "flex";
}

function openUserModal() {
    playSound("click");
    userModal.style.display = "flex";
}

function closeSettings() {
    playSound("click");
    settingsModal.style.display = "none";
    saveSettings();
}

function toggleSound() {
    soundEnabled = soundToggle.checked;
    saveSettings();
}

function toggleMusic() {
    musicEnabled = musicToggle.checked;
    if (musicEnabled) {
        backgroundMusic.play().catch((e) => console.log("Music play prevented:", e));
    } else {
        backgroundMusic.pause();
    }
    saveSettings();
}

function toggleTheme() {
    darkTheme = themeToggle.checked;
    document.body.classList.toggle("dark-theme", darkTheme);
    themeLabel.textContent = translate(darkTheme ? "dark" : "light");
    saveSettings();
}

function changeLanguage() {
    language = languageSelect.value;
    updateTextDirection();
    applyTranslations();
    saveSettings();
}

function saveSettings() {
    const settings = {
        soundEnabled,
        musicEnabled,
        darkTheme,
        language
    };
    localStorage.setItem("ticTacToeSettings", JSON.stringify(settings));

    // Mettre à jour les paramètres dans la partie
    gameRef.child("settings").update({
        soundEnabled,
        musicEnabled,
        darkTheme
    });
}

// Validation du formulaire
function validateForm(e) {
    if (e) e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    removeAllErrorMessages();

    const nameIsValid = validateName(name);
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);

    if (nameIsValid && emailIsValid && passwordIsValid) {
        showSuccessMessage();
        setTimeout(() => {
            userModal.style.display = "none";
        }, 3000);
    }
}

function removeAllErrorMessages() {
    removeErrorMessage("name");
    removeErrorMessage("email");
    removeErrorMessage("password");
}

function createErrorMessageElement(inputId, messageKey) {
    const input = document.getElementById(inputId);
    const errorId = `${inputId}Error`;
    let errorElement = document.getElementById(errorId);

    if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.id = errorId;
        errorElement.className = "error-message";
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
    const isValid = /^[A-Za-zÀ-ÿ\s\-_']+$/.test(name);
    if (!isValid) createErrorMessageElement("name", "nameError");
    return isValid;
}

function validateEmail(email) {
    const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    if (!isValid) createErrorMessageElement("email", "emailError");
    return isValid;
}

function validatePassword(password) {
    const isValid =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);
    if (!isValid) createErrorMessageElement("password", "passwordError");
    return isValid;
}

function showSuccessMessage() {
    const existingSuccess = document.querySelector(".success-message");
    if (existingSuccess) existingSuccess.remove();

    const successElement = document.createElement("div");
    successElement.className = "success-message";
    successElement.textContent = translate("registrationSuccess");
    registerForm.appendChild(successElement);
    setTimeout(() => successElement.remove(), 3000);
}

// Événements
document.addEventListener("DOMContentLoaded", () => {
    // Événements pour les icônes
    settingsIcon.addEventListener("click", openSettings);
    userIcon.addEventListener("click", openUserModal);

    // Fermeture des modals
    document.querySelector(".close-btn").addEventListener("click", closeSettings);
    closeUserModal.addEventListener("click", () => {
        userModal.style.display = "none";
    });

    // Événements pour les paramètres
    soundToggle.addEventListener("change", toggleSound);
    musicToggle.addEventListener("change", toggleMusic);
    themeToggle.addEventListener("change", toggleTheme);
    languageSelect.addEventListener("change", changeLanguage);

    // Formulaire d'inscription
    registerForm.addEventListener("submit", validateForm);

    // Fermeture des modals en cliquant à l'extérieur
    window.addEventListener("click", (event) => {
        if (event.target === settingsModal) {
            closeSettings();
        }
        if (event.target === userModal) {
            userModal.style.display = "none";
        }
    });

    // Activer la musique au premier clic
    document.addEventListener(
        "click",
        () => {
            if (musicEnabled && backgroundMusic.paused) {
                backgroundMusic.play().catch((err) => {
                    console.warn("Échec de la lecture automatique de la musique :", err);
                });
            }
        },
        { once: true }
    );
});

// Style CSS pour la notification de résultat final
const style = document.createElement("style");
style.textContent = `
.final-result-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--modal-bg);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    text-align: center;
    width: 40%;
    height:40vh;
    border: 2px solid var(--accent-color);
}

.final-result-notification h3 {
    color: var(--accent-color);
    margin-bottom: 10px;
    size:2rem
}

.final-result-notification p {
    margin-bottom: 15px;
    font-size: 1.1em;
}

.final-result-notification button {
    margin-top: 15px;
    padding: 15px 30px;
    background: var(--accent-color);
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.5em;
}

.final-result-notification button:hover {
    opacity: 0.9;
}
`;
document.head.appendChild(style);