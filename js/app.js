// jquery
const $ = window.jQuery

$(document).ready(() => {
  // =================================
  // HELPER FUNCTION
  // =================================
  function shuffleAndPick(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // =================================
  // GAME DATA
  // =================================
  const GameData = {
    allRowCategories: [
      { name: "Nacional", id: "nacional" },
      { name: "Peñarol", id: "penarol" },
      { name: "Defensor Sporting", id: "defensor" },
      { name: "Campeón de América", id: "campeon_america" },
      { name: "Intercontinental", id: "intercontinental" },
    ],
    allColCategories: [
      { name: "Selección Uruguaya", id: "uruguay_nt", image: "../public/assets/auf.png" },
      { name: "Liga Argentina", id: "liga_argentina", image: "../public/assets/afa.png" },
      { name: "Serie A (Italia)", id: "serie_a", image: "../public/assets/seriea.png" },
      { name: "Premier League", id: "premier_league", image: "../public/assets/premier.png" },
      { name: "LaLiga (España)", id: "laliga", image: "../public/assets/laliga.png" },
      { name: "Copa Sudamericana", id: "sudamericana", image: "../public/assets/sudamericana.png" },
    ],
    rowCategories: [],
    colCategories: [],
    playerDatabase: {
      "luis suarez": ["nacional", "uruguay_nt", "laliga", "campeon_america", "premier_league"],
      "diego forlan": [
        "penarol",
        "uruguay_nt",
        "premier_league",
        "laliga",
        "campeon_america",
        "intercontinental",
        "serie_a",
      ],
      "alvaro recoba": ["nacional", "uruguay_nt", "serie_a"],
      "edinson cavani": ["uruguay_nt", "serie_a", "campeon_america", "penarol", "laliga"],
      "diego godin": ["nacional", "uruguay_nt", "laliga", "campeon_america", "intercontinental", "serie_a"],
      "martin campana": ["defensor", "uruguay_nt", "liga_argentina", "sudamericana"],
      "nicolas de la cruz": ["uruguay_nt", "liga_argentina", "campeon_america"],
      "fernando muslera": ["uruguay_nt", "campeon_america", "serie_a"],
      "carlos sanchez": ["liga_argentina", "uruguay_nt", "campeon_america", "sudamericana"],
      "egidio arevalo rios": ["penarol", "uruguay_nt", "liga_argentina"],
      "sebastian abreu": ["nacional", "liga_argentina", "uruguay_nt", "campeon_america"],
      "walter gargano": ["penarol", "uruguay_nt", "serie_a", "defensor"],
      "maxi rodriguez": ["penarol", "liga_argentina", "campeon_america", "laliga"],
      "pablo bengoechea": ["penarol", "uruguay_nt", "campeon_america"],
      "jorge fossati": ["defensor", "uruguay_nt", "campeon_america", "penarol"],
      "enrique iglesias": ["defensor", "uruguay_nt", "sudamericana"],
      "ronald araujo": ["uruguay_nt", "laliga"],
      "federico valverde": ["uruguay_nt", "laliga", "campeon_america", "penarol"],
      "darwin nuñez": ["uruguay_nt", "penarol", "premier_league"],
      "sebastian coates": ["nacional", "uruguay_nt", "campeon_america", "premier_league"],
      "martin caceres": ["defensor", "uruguay_nt", "serie_a", "laliga", "campeon_america"],
      "gustavo matosas": ["peñarol", "campeon_america", "uruguay_nt"],
      "sergio agüero": ["laliga", "premier_league", "campeon_america"],
      "carlos tevez": ["liga_argentina", "premier_league", "campeon_america", "intercontinental", "serie_a"],
      "enzo francescoli": ["liga_argentina", "uruguay_nt", "campeon_america", "intercontinental", "serie_a"],
    },
    validatePlayer: function (name, rowCategory, colCategory) {
      const playerName = name.toLowerCase().trim()
      const playerData = this.playerDatabase[playerName]
      if (!playerData) return false
      return playerData.includes(rowCategory) && playerData.includes(colCategory)
    },
  }

  // =================================
  // GAME UI
  // =================================
  const GameUI = (() => {
    const boardElement = $("#game-board")
    const statusElement = $("#game-status")
    const dialogElement = $("#player-input-dialog")
    const inputElement = $("#player-name-input")
    const formElement = $("#player-input-form")
    const toastContainer = $("#toast-container")
    const timerElement = $("#timer")

    function renderBoard() {
      boardElement.empty()
      boardElement.append('<div class="grid-cell"></div>')

      GameData.colCategories.forEach((cat) => {
        const imageHtml = cat.image ? `<img src="${cat.image}" alt="${cat.name}">` : ""
        const header = $(`
          <div class="grid-cell header-cell">
            ${imageHtml}
            <div class="header-text">${cat.name}</div>
          </div>`)
        boardElement.append(header)
      })

      for (let i = 0; i < 3; i++) {
        const rowCat = GameData.rowCategories[i]
        const rowHeader = $(`
          <div class="grid-cell header-cell">
            <span>${rowCat.name}</span>
          </div>`)
        boardElement.append(rowHeader)

        for (let j = 0; j < 3; j++) {
          const squareIndex = i * 3 + j
          const square = $(`<div class="grid-cell square" data-index="${squareIndex}"></div>`)
          boardElement.append(square)
        }
      }
    }

    function updateSquare(index, player) {
      const symbol = player === "X" ? "❌" : "⭕"
      const symbolClass = player === "X" ? "x-symbol" : "o-symbol"
      boardElement.find(`.square[data-index=${index}]`).text(symbol).addClass(`filled ${symbolClass}`)
    }

    function updateStatus(message) {
      statusElement.text(message)
    }

    function showDialog() {
      dialogElement.removeClass("hidden")
      inputElement.focus()
    }

    function hideDialog() {
      inputElement.val("")
      dialogElement.addClass("hidden")
    }

    function highlightWinner(line) {
      line.forEach((index) => {
        boardElement.find(`.square[data-index=${index}]`).addClass("winner")
      })
    }

    function showToast(message, type = "success") {
      const toast = $(`<div class="toast ${type}">${message}</div>`)
      toastContainer.append(toast)
      toast
        .fadeIn(400)
        .delay(2500)
        .fadeOut(400, function () {
          $(this).remove()
        })
    }

    function updateTimer(timeLeft) {
      timerElement.text(`Tiempo: ${timeLeft}s`)
      if (timeLeft <= 10) {
        timerElement.addClass("low-time")
      } else {
        timerElement.removeClass("low-time")
      }
    }

    return {
      renderBoard,
      updateSquare,
      updateStatus,
      showDialog,
      hideDialog,
      highlightWinner,
      showToast,
      updateTimer,
      formElement,
    }
  })()

  // =================================
  // GAME LOGIC
  // =================================
  const Game = {
    state: {
      board: Array(9).fill(null),
      currentPlayer: "X",
      isGameOver: false,
      selectedSquare: null,
      turnTimer: null,
      timeLeft: 45,
    },

    init: function () {
      this.resetGame()
      this.bindEvents()
    },

    bindEvents: function () {
      $("#game-board").on("click", ".square:not(.filled)", (e) => {
        if (this.state.isGameOver) return
        this.stopTurnTimer()
        const index = $(e.currentTarget).data("index")
        this.handleSquareClick(index)
      })

      $("#reset-button").on("click", () => this.resetGame())

      $("#skip-button").on("click", () => {
        if (this.state.isGameOver) return
        GameUI.showToast("Turno saltado", "info")
        this.switchPlayer()
      })

      GameUI.formElement.on("submit", (e) => {
        e.preventDefault()
        this.handlePlayerSubmit($("#player-name-input").val())
      })

      $("#cancel-button").on("click", () => {
        GameUI.hideDialog()
        this.startTurnTimer() // Resume timer if they cancel
      })
    },

    startTurnTimer: function () {
      this.stopTurnTimer() // Ensure no multiple timers are running
      this.state.timeLeft = 45
      GameUI.updateTimer(this.state.timeLeft)
      this.state.turnTimer = setInterval(() => {
        this.state.timeLeft--
        GameUI.updateTimer(this.state.timeLeft)
        if (this.state.timeLeft <= 0) {
          GameUI.showToast("¡Se acabó el tiempo! Turno perdido.", "error")
          this.switchPlayer()
        }
      }, 1000)
    },

    stopTurnTimer: function () {
      clearInterval(this.state.turnTimer)
      this.state.turnTimer = null
    },

    handleSquareClick: function (index) {
      this.state.selectedSquare = index
      GameUI.showDialog()
    },

    handlePlayerSubmit: function (playerName) {
      if (!playerName.trim() || this.state.selectedSquare === null) {
        GameUI.hideDialog()
        return
      }

      const index = this.state.selectedSquare
      const rowCat = GameData.rowCategories[Math.floor(index / 3)].id
      const colCat = GameData.colCategories[index % 3].id

      if (GameData.validatePlayer(playerName, rowCat, colCat)) {
        this.state.board[index] = this.state.currentPlayer
        GameUI.updateSquare(index, this.state.currentPlayer)
        GameUI.showToast("¡Correcto!", "success")
        if (this.checkEndCondition()) return
      } else {
        GameUI.showToast("¡Incorrecto! Turno perdido.", "error")
      }

      this.switchPlayer()
      GameUI.hideDialog()
    },

    switchPlayer: function () {
      if (this.state.isGameOver) return
      this.state.currentPlayer = this.state.currentPlayer === "X" ? "O" : "X"
      GameUI.updateStatus(`Siguiente jugador: ${this.state.currentPlayer === "X" ? "❌" : "⭕"}`)
      this.startTurnTimer()
    },

    checkEndCondition: function () {
      const winnerInfo = this.calculateWinner()
      if (winnerInfo) {
        this.state.isGameOver = true
        this.stopTurnTimer()
        GameUI.updateStatus(`¡Ganador: ${winnerInfo.player === "X" ? "❌" : "⭕"}!`)
        GameUI.highlightWinner(winnerInfo.line)
        return true
      }

      if (!this.state.board.includes(null)) {
        this.state.isGameOver = true
        this.stopTurnTimer()
        GameUI.updateStatus("¡Es un empate!")
        return true
      }
      return false
    },

    calculateWinner: function () {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // fila
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columnas
        [0, 4, 8],
        [2, 4, 6], // diagonales
      ]
      for (const line of lines) {
        const [a, b, c] = line
        if (
          this.state.board[a] &&
          this.state.board[a] === this.state.board[b] &&
          this.state.board[a] === this.state.board[c]
        ) {
          return { player: this.state.board[a], line: line }
        }
      }
      return null
    },

    resetGame: function () {
      this.stopTurnTimer()
      GameData.rowCategories = shuffleAndPick(GameData.allRowCategories, 3)
      GameData.colCategories = shuffleAndPick(GameData.allColCategories, 3)
      this.state.board.fill(null)
      this.state.currentPlayer = "X"
      this.state.isGameOver = false
      this.state.selectedSquare = null
      GameUI.renderBoard()
      GameUI.updateStatus(`Siguiente jugador: ❌`)
      this.startTurnTimer()
    },
  }

  Game.init()
})
