// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4WtmzgI-Ue8xWpdglgQ3etHSKJ2R4QRo",
    authDomain: "tic-tac-toe-online-b3366.firebaseapp.com",
    databaseURL: "https://tic-tac-toe-online-b3366-default-rtdb.firebaseio.com",
    projectId: "tic-tac-toe-online-b3366",
    storageBucket: "tic-tac-toe-online-b3366.appspot.com",
    messagingSenderId: "600108456209",
    appId: "1:600108456209:web:243eca35089be054a2d4b0",
    measurementId: "G-P6FMSCZ2M4",
  }
  
  // Initialiser Firebase
  const app = firebase.initializeApp(firebaseConfig)
  const database = firebase.database()
  
  // Éléments du DOM
  const createGameBtn = document.getElementById("createGameBtn")
  const joinGameBtn = document.getElementById("joinGameBtn")
  const gameIdInput = document.getElementById("gameIdInput")
  const gameLink = document.getElementById("gameLink")
  const gameIdDisplay = document.getElementById("gameIdDisplay")
  const copyIdBtn = document.getElementById("copyIdBtn")
  const goToGameBtn = document.getElementById("goToGameBtn")
  const joinStatus = document.getElementById("joinStatus")
  const settingsIcon = document.getElementById("settingsIcon")
  const userIcon = document.getElementById("userIcon")
  const settingsModal = document.getElementById("settingsModal")
  const userModal = document.getElementById("userModal")
  const closeUserModal = document.getElementById("closeUserModal")
  const soundToggle = document.getElementById("soundToggle")
  const musicToggle = document.getElementById("musicToggle")
  const themeToggle = document.getElementById("themeToggle")
  const themeLabel = document.getElementById("themeLabel")
  const languageSelect = document.getElementById("languageSelect")
  const registerForm = document.getElementById("registerForm")
  
  // Audio elements
  const backgroundMusic = document.getElementById("backgroundMusic")
  const clickSound = document.getElementById("clickSound")
  
  // Variables d'état
  let soundEnabled = true
  let musicEnabled = true
  let darkTheme = false
  let language = "fr"
  
  // Traductions
  const translations = {
    en: {
      pageTitle: "Tic Tac Toe Online",
      createGame: "Create New Game",
      joinGame: "Join Game",
      enterGameId: "Enter Game ID",
      yourGameId: "Your Game ID:",
      shareId: "Share this ID with your friend to join",
      goToGame: "Go to Game",
      creating: "Creating...",
      joining: "Connecting...",
      searchingGame: "Searching for game...",
      gameNotFound: "Game not found",
      gameFull: "The game is already full",
      connectionError: "Connection error",
      connectionSuccess: "Connection successful! Redirecting...",
      pleaseEnterGameId: "Please enter a game ID",
      copied: "Copied!",
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
      passwordError:
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol.",
      registrationSuccess: "✅ Registration successful!",
      gameOver: "Game Over",
      playerWins: "Player {player} wins!",
      youWin: "You win!",
      youLose: "You lose!",
      draw: "It's a draw!",
      playAgain: "Play Again",
      backToMenu: "Back to Menu",
    },
    fr: {
      pageTitle: "Morpion En Ligne",
      createGame: "Créer une nouvelle partie",
      joinGame: "Rejoindre une partie",
      enterGameId: "Entrez l'ID de la partie",
      yourGameId: "ID de votre partie :",
      shareId: "Donnez cet ID à votre ami pour qu'il puisse rejoindre",
      goToGame: "Accéder à la partie",
      creating: "Création en cours...",
      joining: "Connexion...",
      searchingGame: "Recherche de la partie...",
      gameNotFound: "Partie non trouvée",
      gameFull: "La partie est déjà complète",
      connectionError: "Erreur de connexion",
      connectionSuccess: "Connexion réussie! Redirection...",
      pleaseEnterGameId: "Veuillez entrer un ID de partie",
      copied: "Copié !",
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
      passwordError:
        "Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule, un chiffre et un symbole.",
      registrationSuccess: "✅ Inscription réussie !",
      gameOver: "Fin partie",
      playerWins: "Joueur {player} gagne!",
      youWin: "Vous gagnez!",
      youLose: "Vous perdez!",
      draw: "Match nul!",
      playAgain: "Rejouer",
      backToMenu: "Retour au menu",
    },
    ar: {
      pageTitle: "لعبة إكس-أو أونلاين",
      createGame: "إنشاء لعبة جديدة",
      joinGame: "الانضمام إلى لعبة",
      enterGameId: "أدخل معرف اللعبة",
      yourGameId: "معرف لعبتك:",
      shareId: "شارك هذا المعرف مع صديقك للانضمام",
      goToGame: "الذهاب إلى اللعبة",
      creating: "جاري الإنشاء...",
      joining: "جاري الاتصال...",
      searchingGame: "البحث عن اللعبة...",
      gameNotFound: "اللعبة غير موجودة",
      gameFull: "اللعبة ممتلئة بالفعل",
      connectionError: "خطأ في الاتصال",
      connectionSuccess: "تم الاتصال بنجاح! جاري التحويل...",
      pleaseEnterGameId: "الرجاء إدخال معرف اللعبة",
      copied: "تم النسخ!",
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
      playerWins: "اللاعب {player} فاز!",
      youWin: "لقد فزت!",
      youLose: "لقد خسرت!",
      draw: "تعادل!",
      playAgain: "العب مرة أخرى",
      backToMenu: "العودة إلى القائمة",
    },
  }
  
  // Charger les paramètres
  function loadSettings() {
    const saved = localStorage.getItem("ticTacToeSettings")
    if (saved) {
      const settings = JSON.parse(saved)
      soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true
      musicEnabled = settings.musicEnabled !== undefined ? settings.musicEnabled : true
      darkTheme = settings.darkTheme || false
      language = settings.language || "fr"
  
      // Appliquer les paramètres
      soundToggle.checked = soundEnabled
      musicToggle.checked = musicEnabled
      themeToggle.checked = darkTheme
      languageSelect.value = language
  
      // Appliquer le thème
      document.body.classList.toggle("dark-theme", darkTheme)
      themeLabel.textContent = translate(darkTheme ? "dark" : "light")
  
      // Mettre à jour la direction du texte
      updateTextDirection()
  
      // Gérer la musique
      if (musicEnabled) {
        backgroundMusic.volume = 0.5
        backgroundMusic.play().catch((e) => console.log("Music autoplay prevented:", e))
      }
    }
  
    // Appliquer les traductions
    applyTranslations()
  }
  
  // Mettre à jour la direction du texte
  function updateTextDirection() {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }
  
  // Appliquer les traductions
  function applyTranslations() {
    // Titre de la page
    document.querySelector("h1").textContent = translate("pageTitle")
    document.title = translate("pageTitle")
  
    // Boutons et textes
    createGameBtn.textContent = translate("createGame")
    joinGameBtn.textContent = translate("joinGame")
    gameIdInput.placeholder = translate("enterGameId")
  
    if (document.querySelector("#gameLink h3")) {
      document.querySelector("#gameLink h3").textContent = translate("yourGameId")
    }
  
    if (document.querySelector("#gameLink p")) {
      document.querySelector("#gameLink p").textContent = translate("shareId")
    }
  
    if (goToGameBtn) {
      goToGameBtn.textContent = translate("goToGame")
    }
  
    // Éléments avec attribut data-translate
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.getAttribute("data-translate")
      el.textContent = translate(key)
    })
  
    // Mettre à jour le texte du thème
    themeLabel.textContent = translate(darkTheme ? "dark" : "light")
  }
  
  // Fonction de traduction
  function translate(key, params = {}) {
    let text = translations[language][key] || key
  
    // Remplacer les paramètres
    for (const [param, value] of Object.entries(params)) {
      text = text.replace(`{${param}}`, value)
    }
  
    return text
  }
  
























  // Générer un ID de partie aléatoire
  function generateGameId() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
  
  // Créer une nouvelle partie
  createGameBtn.addEventListener("click", async () => {
    playSound("click")
    createGameBtn.disabled = true
    createGameBtn.textContent = translate("creating")
  
    const gameId = generateGameId()
    const gameRef = database.ref("games/" + gameId)
  
    try {
      // Créer la partie dans la base de données
      await gameRef.set({
        player1: true,
        player2: false,
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: "X",
        gameOver: false,
        winner: null,
        scores: { X: 0, O: 0, draw: 0 },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        language: language, // Stocker la langue choisie
        settings: {
          soundEnabled,
          musicEnabled,
          darkTheme,
        },
      })
  
      // Afficher l'ID de la partie
      gameIdDisplay.textContent = gameId
      gameLink.style.display = "block"
  
      // Bouton de copie
      copyIdBtn.addEventListener("click", () => {
        playSound("click")
        navigator.clipboard
          .writeText(gameId)
          .then(() => {
            const originalText = gameIdDisplay.textContent
            gameIdDisplay.textContent = translate("copied")
            setTimeout(() => {
              gameIdDisplay.textContent = originalText
            }, 2000)
          })
          .catch((err) => {
            console.error("Erreur de copie : ", err)
            alert("Erreur lors de la copie")
          })
      })
  
      // Bouton pour accéder au jeu
      goToGameBtn.style.display = "inline-block"
      goToGameBtn.addEventListener("click", () => {
        playSound("click")
        window.location.href = `index3.html?gameId=${gameId}&player=X&lang=${language}`
      })
    } catch (error) {
      console.error("Erreur création partie :", error)
      joinStatus.textContent = translate("connectionError")
      joinStatus.style.color = "red"
    } finally {
      createGameBtn.disabled = false
      createGameBtn.textContent = translate("createGame")
    }
  })
  
































  // Rejoindre une partie existante
  joinGameBtn.addEventListener("click", async () => {
    playSound("click")
    const gameId = gameIdInput.value.trim()
  
    if (!gameId) {
      joinStatus.textContent = translate("pleaseEnterGameId")
      joinStatus.style.color = "red"
      return
    }
  
    joinGameBtn.disabled = true
    joinGameBtn.textContent = translate("joining")
    joinStatus.textContent = translate("searchingGame")
    joinStatus.style.color = "blue"
  
    try {
      const snapshot = await database.ref("games/" + gameId).once("value")
  
      if (!snapshot.exists()) {
        joinStatus.textContent = translate("gameNotFound")
        joinStatus.style.color = "red"
        return
      }
  
      const gameData = snapshot.val()
  
      if (gameData.player2) {
        joinStatus.textContent = translate("gameFull")
        joinStatus.style.color = "red"
        return
      }
  
      // Rejoindre la partie
      await database.ref("games/" + gameId).update({
        player2: true,
      })
  
      // Récupérer la langue et les paramètres de la partie
      const gameLang = gameData.language || language
      const gameSettings = gameData.settings || {}
  
      // Sauvegarder les paramètres
      const settings = {
        language: gameLang,
        soundEnabled: gameSettings.soundEnabled !== undefined ? gameSettings.soundEnabled : soundEnabled,
        musicEnabled: gameSettings.musicEnabled !== undefined ? gameSettings.musicEnabled : musicEnabled,
        darkTheme: gameSettings.darkTheme !== undefined ? gameSettings.darkTheme : darkTheme,
      }
      localStorage.setItem("ticTacToeSettings", JSON.stringify(settings))
  
      joinStatus.textContent = translate("connectionSuccess")
      joinStatus.style.color = "green"
  
      setTimeout(() => {
        window.location.href = `index3.html?gameId=${gameId}&player=O&lang=${gameLang}`
      }, 1000)
    } catch (error) {
      console.error("Erreur rejoindre partie:", error)
      joinStatus.textContent = translate("connectionError")
      joinStatus.style.color = "red"
    } finally {
      joinGameBtn.disabled = false
      joinGameBtn.textContent = translate("joinGame")
    }
  })
  
  // Nettoyer les anciennes parties (toutes les heures)
  setInterval(() => {
    const cutoff = Date.now() - 3600000 // 1 heure
    const oldGamesRef = database.ref("games").orderByChild("createdAt").endAt(cutoff)
  
    oldGamesRef.once("value", (snapshot) => {
      snapshot.forEach((child) => {
        child.ref.remove()
      })
    })
  }, 3600000)
  
  // Fonctions pour les paramètres
  function openSettings() {
    playSound("click")
    settingsModal.style.display = "flex"
  }
  
  function openUserModal() {
    playSound("click")
    userModal.style.display = "flex"
  }
  
  function closeSettings() {
    playSound("click")
    settingsModal.style.display = "none"
    saveSettings()
  }
  
  function toggleSound() {
    soundEnabled = soundToggle.checked
    saveSettings()
  }
  
  function toggleMusic() {
    musicEnabled = musicToggle.checked
    if (musicEnabled) {
      backgroundMusic.play().catch((e) => console.log("Music play prevented:", e))
    } else {
      backgroundMusic.pause()
    }
    saveSettings()
  }
  
  function toggleTheme() {
    darkTheme = themeToggle.checked
    document.body.classList.toggle("dark-theme", darkTheme)
    themeLabel.textContent = translate(darkTheme ? "dark" : "light")
    saveSettings()
  }
  
  function changeLanguage() {
    language = languageSelect.value
    updateTextDirection()
    applyTranslations()
    saveSettings()
  }
  
  function saveSettings() {
    const settings = {
      soundEnabled,
      musicEnabled,
      darkTheme,
      language,
    }
    localStorage.setItem("ticTacToeSettings", JSON.stringify(settings))
  }
  
  function playSound(type) {
    if (!soundEnabled) return
  
    if (type === "click") {
      clickSound.currentTime = 0
      clickSound.play().catch((e) => console.log("Sound play error:", e))
    }
  }
  
  // Validation du formulaire
  function validateForm(e) {
    if (e) e.preventDefault()
  
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
  
    removeAllErrorMessages()
  
    const nameIsValid = validateName(name)
    const emailIsValid = validateEmail(email)
    const passwordIsValid = validatePassword(password)
  
    if (nameIsValid && emailIsValid && passwordIsValid) {
      showSuccessMessage()
      setTimeout(() => {
        userModal.style.display = "none"
      }, 3000)
    }
  }
  
  function removeAllErrorMessages() {
    removeErrorMessage("name")
    removeErrorMessage("email")
    removeErrorMessage("password")
  }
  
  function createErrorMessageElement(inputId, messageKey) {
    const input = document.getElementById(inputId)
    const errorId = `${inputId}Error`
    let errorElement = document.getElementById(errorId)
  
    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.id = errorId
      errorElement.className = "error-message"
      input.parentNode.insertBefore(errorElement, input.nextSibling)
    }
  
    errorElement.textContent = translate(messageKey)
    return errorElement
  }
  
  function removeErrorMessage(inputId) {
    const errorId = `${inputId}Error`
    const errorElement = document.getElementById(errorId)
    if (errorElement) errorElement.remove()
  }
  
  function validateName(name) {
    const isValid = /^[A-Za-zÀ-ÿ\s\-_']+$/.test(name)
    if (!isValid) createErrorMessageElement("name", "nameError")
    return isValid
  }
  
  function validateEmail(email) {
    const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
    if (!isValid) createErrorMessageElement("email", "emailError")
    return isValid
  }
  
  function validatePassword(password) {
    const isValid =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    if (!isValid) createErrorMessageElement("password", "passwordError")
    return isValid
  }
  
  function showSuccessMessage() {
    const existingSuccess = document.querySelector(".success-message")
    if (existingSuccess) existingSuccess.remove()
  
    const successElement = document.createElement("div")
    successElement.className = "success-message"
    successElement.textContent = translate("registrationSuccess")
    registerForm.appendChild(successElement)
    setTimeout(() => successElement.remove(), 3000)
  }
  
  // Événements
  document.addEventListener("DOMContentLoaded", () => {
    loadSettings()
  
    // Événements pour les icônes
    settingsIcon.addEventListener("click", openSettings)
    userIcon.addEventListener("click", openUserModal)
  
    // Fermeture des modals
    document.querySelector(".close-btn").addEventListener("click", closeSettings)
    closeUserModal.addEventListener("click", () => {
      userModal.style.display = "none"
    })
  
    // Événements pour les paramètres
    soundToggle.addEventListener("change", toggleSound)
    musicToggle.addEventListener("change", toggleMusic)
    themeToggle.addEventListener("change", toggleTheme)
    languageSelect.addEventListener("change", changeLanguage)
  
    // Formulaire d'inscription
    registerForm.addEventListener("submit", validateForm)
  
    // Fermeture des modals en cliquant à l'extérieur
    window.addEventListener("click", (event) => {
      if (event.target === settingsModal) {
        closeSettings()
      }
      if (event.target === userModal) {
        userModal.style.display = "none"
      }
    })
  
    // Activer la musique au premier clic
    document.addEventListener(
      "click",
      () => {
        if (musicEnabled && backgroundMusic.paused) {
          backgroundMusic.play().catch((err) => {
            console.warn("Échec de la lecture automatique de la musique :", err)
          })
        }
      },
      { once: true },
    )
  })
  