// jquery
const $ = window.jQuery

$(document).ready(() => {
  // =================================
  // GAME DATA
  // =================================
  const GameData = {
    allCategories: [],
    rowCategories: [],
    colCategories: [],
    playerDatabase: {},

    // Función para cargar los datos desde el archivo JSON
    loadData: function () {
      return $.getJSON("./js/gameData.json")
        .done((data) => {
          this.allCategories = data.allCategories
          this.playerDatabase = data.playerDatabase
          console.log("Datos cargados correctamente")
        })
        .fail((error) => {
          console.error("Error al cargar los datos:", error)
          // Mostrar mensaje de error al usuario
          GameUI.showToast("Error al cargar los datos del juego", "error")
        })
    },

    validatePlayer: function (name, rowCategory, colCategory) {
      const playerName = name.toLowerCase().trim()
      const playerData = this.playerDatabase[playerName]
      if (!playerData) return false
      return playerData.includes(rowCategory) && playerData.includes(colCategory)
    },
  }

  // =================================
  // GAME HISTORY 
  // =================================
  const GameHistory = {
    // Cargar histórico desde localStorage
    loadHistory: () => {
      return new Promise((resolve, reject) => {
        try {
          const historyData = localStorage.getItem("gameHistory")
          if (historyData) {
            const parsedHistory = JSON.parse(historyData)
            console.log("Histórico cargado correctamente")
            resolve(parsedHistory)
          } else {
            // Retornar estructura vacía si no hay datos
            const emptyHistory = {
              matches: [],
              statistics: {
                totalGames: 0,
                playerXWins: 0,
                playerOWins: 0,
                draws: 0,
                lastUpdated: null,
              },
            }
            resolve(emptyHistory)
          }
        } catch (error) {
          console.error("Error al cargar el histórico:", error)
          reject(error)
        }
      })
    },

    // Guardar resultado de partida usando localStorage
    saveGameResult: (gameResult) => {
      // Cargar histórico actual desde localStorage
      const currentHistory = JSON.parse(localStorage.getItem("gameHistory")) || {
        matches: [],
        statistics: {
          totalGames: 0,
          playerXWins: 0,
          playerOWins: 0,
          draws: 0,
          lastUpdated: null,
        },
      }

      // Crear nueva partida
      const newMatch = {
        id: Date.now(),
        date: new Date().toISOString(),
        result: gameResult.result, // 'X', 'O', 'draw'
        duration: gameResult.duration,
        playersUsed: gameResult.playersUsed,
        winningLine: gameResult.winningLine || null,
        categories: {
          rows: GameData.rowCategories.map((cat) => cat.name),
          cols: GameData.colCategories.map((cat) => cat.name),
        },
      }

      // Agregar al inicio del array
      currentHistory.matches.unshift(newMatch)

      // Mantener solo las últimas 50 partidas
      if (currentHistory.matches.length > 50) {
        currentHistory.matches = currentHistory.matches.slice(0, 50)
      }

      // Actualizar estadísticas
      currentHistory.statistics.totalGames++
      if (gameResult.result === "X") {
        currentHistory.statistics.playerXWins++
      } else if (gameResult.result === "O") {
        currentHistory.statistics.playerOWins++
      } else {
        currentHistory.statistics.draws++
      }
      currentHistory.statistics.lastUpdated = new Date().toISOString()

      // Guardar en localStorage
      localStorage.setItem("gameHistory", JSON.stringify(currentHistory))

      console.log("Partida guardada:", newMatch)
      GameUI.showToast("Partida guardada en el histórico 🏆", "success")
    },

    // Mostrar histórico de partidas
    showHistory: function () {
      GameUI.showLoadingDialog("Cargando histórico...")

      this.loadHistory()
        .then((history) => {
          GameUI.hideLoadingDialog()
          GameUI.showHistoryDialog(history)
        })
        .catch(() => {
          GameUI.hideLoadingDialog()
          GameUI.showToast("No se pudo cargar el histórico", "error")
        })
    },
  }

  // =================================
  // HELPER FUNCTIONS
  // =================================
  function shuffleAndPick(arr, count) {
    // Mezclamos el arreglo y seleccionamos una cantidad especifica de elementos
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
  // spread operator

  function findPlayersForCombination(cat1Id, cat2Id) {
    // Encontramos jugadores que coincidan con las categorias proporcionadas
    return Object.keys(GameData.playerDatabase).filter((player) => {
      const playerData = GameData.playerDatabase[player]
      return playerData.includes(cat1Id) && playerData.includes(cat2Id)
    })
  }

  function generateSolvableGrid() {
    // Generamos una cuadricula que sea resolvible
    let isSolvable = false
    let selectedCategories, tempRows, tempCols

    while (!isSolvable) {
      isSolvable = true // asumimos que es resolvible
      selectedCategories = shuffleAndPick(GameData.allCategories, 6)
      tempRows = selectedCategories.slice(0, 3)
      tempCols = selectedCategories.slice(3, 6)

      // Verificamos cada una de las 9 celdas para al menos un jugador valido
      for (const rowCat of tempRows) {
        for (const colCat of tempCols) {
          const players = findPlayersForCombination(rowCat.id, colCat.id)
          if (players.length === 0) {
            isSolvable = false // Esta cuadricula no es resolvible
            break // No es necesario verificar otras columnas
          }
        }
        if (!isSolvable) {
          break // No es necesario verificar otras filas
        }
      }
    }
    // Una vez que se encuentre una cuadricula resolvible, asignamos
    GameData.rowCategories = tempRows
    GameData.colCategories = tempCols
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
      // Renderizamos el tablero de juego
      boardElement.empty()
      boardElement.append('<div class="grid-cell project-label"><span>Proyecto RIA</span></div>')

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
        const imageHtml = rowCat.image ? `<img src="${rowCat.image}" alt="${rowCat.name}">` : ""
        const rowHeader = $(`
          <div class="grid-cell header-cell">
            ${imageHtml}
            <div class="header-text">${rowCat.name}</div>
          </div>`)
        boardElement.append(rowHeader)

        for (let j = 0; j < 3; j++) {
          const squareIndex = i * 3 + j
          const square = $(`<div class="grid-cell square" data-index="${squareIndex}"></div>`)
          boardElement.append(square)
        }
      }
    }

    function updateSquare(index, player, playerName) {
      // Actualizamos una celda del tablero con ❌ ⭕️
      const symbol = player === "X" ? "❌" : "⭕"
      const symbolClass = player === "X" ? "x-symbol" : "o-symbol"
      const squareContent = `
        <span class="square-symbol">${symbol}</span>
        <span class="player-name-label">${playerName}</span>
      `
      boardElement.find(`.square[data-index=${index}]`).html(squareContent).addClass(`filled ${symbolClass}`)
    }

    function updateStatus(message) {
      // Actualizamos el estado del juego
      statusElement.text(message)
    }

    function showDialog() {
      // Mostramos el cuadro de dialogo para ingresar el nombre del jugador
      dialogElement.removeClass("hidden")
      inputElement.focus()
    }

    function hideDialog() {
      // ocultamos el cuadro del dialogo
      inputElement.val("")
      dialogElement.addClass("hidden")
    }

    function highlightWinner(line) {
      // Resalta las celdas ganadoras
      line.forEach((index) => {
        boardElement.find(`.square[data-index=${index}]`).addClass("winner")
      })
    }

    function showToast(message, type = "success") {
      // Muestra un mensaje emergente (toast)
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
      // Actualizamos el temporizador del turno
      timerElement.text(`Tiempo: ${timeLeft}s`)
      if (timeLeft <= 10) {
        timerElement.addClass("low-time")
      } else {
        timerElement.removeClass("low-time")
      }
    }

    function showLoadingDialog(message) {
      const loadingHtml = `
        <div id="loading-dialog" class="dialog-overlay">
          <div class="dialog-content loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
          </div>
        </div>
      `
      $("body").append(loadingHtml)
    }

    function hideLoadingDialog() {
      $("#loading-dialog").remove()
    }

    function showHistoryDialog(history) {
      const stats = history.statistics
      const matches = history.matches.slice(0, 10) // Mostrar últimas 10 partidas

      const historyHtml = `
        <div id="history-dialog" class="dialog-overlay">
          <div class="dialog-content history-content">
            <div class="history-header">
              <h2>🏆 Histórico de Partidas</h2>
              <button id="close-history" class="close-btn">✕</button>
            </div>
            
            <div class="statistics-section">
              <h3>📊 Estadísticas Generales</h3>
              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-number">${stats.totalGames}</span>
                  <span class="stat-label">Total Partidas</span>
                </div>
                <div class="stat-item x-wins">
                  <span class="stat-number">${stats.playerXWins}</span>
                  <span class="stat-label">Victorias ❌</span>
                </div>
                <div class="stat-item o-wins">
                  <span class="stat-number">${stats.playerOWins}</span>
                  <span class="stat-label">Victorias ⭕</span>
                </div>
                <div class="stat-item draws">
                  <span class="stat-number">${stats.draws}</span>
                  <span class="stat-label">Empates</span>
                </div>
              </div>
            </div>

            <div class="matches-section">
              <h3>📋 Últimas Partidas</h3>
              <div class="matches-list">
                ${
                  matches.length > 0
                    ? matches
                        .map(
                          (match) => `
                  <div class="match-item">
                    <div class="match-result ${match.result === "draw" ? "draw" : match.result === "X" ? "x-win" : "o-win"}">
                      ${match.result === "draw" ? "🤝" : match.result === "X" ? "❌" : "⭕"}
                    </div>
                    <div class="match-info">
                      <div class="match-date">${new Date(match.date).toLocaleDateString("es-ES")}</div>
                      <div class="match-players">${match.playersUsed.length} jugadas usados</div>
                    </div>
                    <div class="match-duration">${Math.floor(match.duration / 60)}:${(match.duration % 60).toString().padStart(2, "0")}</div>
                  </div>
                `,
                        )
                        .join("")
                    : '<p class="no-matches">No hay partidas registradas aún</p>'
                }
              </div>
            </div>

            <div class="history-actions">
              <button id="clear-history" class="danger-btn">🗑️ Limpiar Histórico</button>
              <button id="export-history" class="secondary-btn">📤 Exportar Datos</button>
            </div>
          </div>
        </div>
      `

      $("body").append(historyHtml)

      // Event listeners para el diálogo de histórico
      $("#close-history").on("click", () => $("#history-dialog").remove())
      $("#history-dialog").on("click", (e) => {
        if (e.target.id === "history-dialog") {
          $("#history-dialog").remove()
        }
      })

      $("#clear-history").on("click", () => {
        if (confirm("¿Estás seguro de que quieres limpiar todo el histórico?")) {
          localStorage.removeItem("gameHistory")
          $("#history-dialog").remove()
          showToast("Histórico limpiado", "info")
        }
      })

      $("#export-history").on("click", () => {
        const dataStr = JSON.stringify(history, null, 2)
        const dataBlob = new Blob([dataStr], { type: "application/json" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = `tateti-historico-${new Date().toISOString().split("T")[0]}.json`
        link.click()
        URL.revokeObjectURL(url)
        showToast("Histórico exportado", "success")
      })
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
      showLoadingDialog,
      hideLoadingDialog,
      showHistoryDialog,
      formElement,
    }
  })()

  // =================================
  // GAME LOGIC
  // =================================
  const Game = {
    state: {
      board: Array(9).fill(null), // Representa el tablero ( 9 celdas vacias)
      currentPlayer: "X", // Jugador actual (❌ o ⭕️)
      isGameOver: false, // Indica si el juego ha terminado
      selectedSquare: null, // Indice de la celda seleccionada
      turnTimer: null, // Temporizador del turno
      timeLeft: 45, // Tiempo restante para el turno actual
      usedPlayers: new Set(),
      gameStartTime: null, // Para calcular duración
      playersUsedInGame: [], // Para el histórico
    },

    init: function () {
      // Inicializamos el juego: resetea el estado y vincula los eventos
      GameUI.updateStatus("Cargando datos del juego...")

      // Cargar datos antes de inicializar el juego
      GameData.loadData()
        .then(() => {
          this.resetGame()
          this.bindEvents()
        })
        .catch(() => {
          GameUI.updateStatus("Error al cargar el juego")
        })
    },

    bindEvents: function () {
      // Vinculamos los eventos de interaccion con el tablero y los botones
      $("#game-board").on("click", ".square:not(.filled)", (e) => {
        if (this.state.isGameOver) return // No permite interaccion si el juego ha terminado
        const index = $(e.currentTarget).data("index") // Obtenemos el indice de la ceulda seleccionada
        this.handleSquareClick(index) // manejamos el clic en la celda
      })

      $("#reset-button").on("click", () => this.resetGame()) // Reseteamos el juego al hacer clic en el botón de reinicio

      $("#skip-button").on("click", () => {
        if (this.state.isGameOver) return // No permite interaccin si el juego ha terminado
        GameUI.showToast("Turno saltado", "info") // Muestra mensaje indicando que el turno fue saltado
        this.switchPlayer() // Cambia al siguiente turno
      })

      // Nuevo botón para mostrar histórico
      $("#history-button").on("click", () => {
        GameHistory.showHistory()
      })

      GameUI.formElement.on("submit", (e) => {
        e.preventDefault() // Previene el comportamiento por defecto del formulario
        this.handlePlayerSubmit($("#player-name-input").val()) // Manejamos el envío del nombre del jugador
      })

      $("#cancel-button").on("click", () => {
        GameUI.hideDialog() // Ocultamos el cuadro de dialogo
      })
    },

    startTurnTimer: function () {
      // Inicia el temporizador del turno
      this.stopTurnTimer() // Detiene cualquier temporizador previo
      this.state.timeLeft = 45 // Reinicia el tiempo restante
      GameUI.updateTimer(this.state.timeLeft) // actualiza el temporizador en la interfaz
      this.state.turnTimer = setInterval(() => {
        this.state.timeLeft--
        GameUI.updateTimer(this.state.timeLeft)
        if (this.state.timeLeft <= 0) {
          GameUI.showToast("¡Se acabó el tiempo! Turno perdido.", "error")
          this.switchPlayer() // Cambia al siguiente jugador
        }
      }, 1000) // Actualiza cada segundo
    },

    stopTurnTimer: function () {
      // detiene el temporizador del turno
      clearInterval(this.state.turnTimer)
      this.state.turnTimer = null
    },

    handleSquareClick: function (index) {
      // Manejamos el clic en una celda del tablero
      this.state.selectedSquare = index // Guarda el indice de la celda seleccionada
      GameUI.showDialog() // muestr el cuadro de dialogo para ingreesar nombre
    },

    handlePlayerSubmit: function (playerName) {
      // Manejamos el envio del nombre del jugador
      if (!playerName.trim() || this.state.selectedSquare === null) {
        GameUI.hideDialog() // oculta el cuadro de dialogo si no hay nombre o celda seleccionada
        return
      }

      const playerNameNormalized = playerName.trim().toLowerCase()
      if (this.state.usedPlayers.has(playerNameNormalized)) {
        GameUI.showToast("Jugador ya utilizado. Elegí otro.", "error")
        GameUI.hideDialog()
        this.startTurnTimer()
        return
      }

      const index = this.state.selectedSquare
      const rowCat = GameData.rowCategories[Math.floor(index / 3)].id // obtenemos la categoria de la fila
      const colCat = GameData.colCategories[index % 3].id // obtenemos la categoria de la columna

      if (GameData.validatePlayer(playerName, rowCat, colCat)) {
        // Valida si el jugador cumple con las categorías seleccionadas
        this.state.board[index] = this.state.currentPlayer // Marcamos la celda con el jugador actual
        GameUI.updateSquare(index, this.state.currentPlayer, playerName) // Actualizamos la celda en la interfaz
        this.state.usedPlayers.add(playerNameNormalized)
        this.state.playersUsedInGame.push({
          name: playerName.trim(),
          player: this.state.currentPlayer,
          position: index,
        })
        GameUI.showToast("¡Correcto!", "success") // Mostramos mensaje de exito
        if (this.checkEndCondition()) return // Verificamos si el juego ha terminado
      } else {
        GameUI.showToast("¡Incorrecto! Turno perdido.", "error") // Muestra mensaje de error
      }

      this.switchPlayer() // Cambia al siguiente jugador
      GameUI.hideDialog() // Oculta el cuadro de diálogo
    },

    switchPlayer: function () {
      // cambia al siguiente jugador
      if (this.state.isGameOver) return
      this.state.currentPlayer = this.state.currentPlayer === "X" ? "O" : "X" // alterna ente X o 0
      GameUI.updateStatus(`Siguiente jugador: ${this.state.currentPlayer === "X" ? "❌" : "⭕"}`) // actualiza el estado en la interfaz
      this.startTurnTimer() // Reinicia el temporizador para el nuevo turno
    },

    checkEndCondition: function () {
      const winnerInfo = this.calculateWinner()
      if (winnerInfo) {
        this.state.isGameOver = true
        this.stopTurnTimer()
        GameUI.updateStatus(`¡Ganador: ${winnerInfo.player === "X" ? "❌" : "⭕"}!`)
        GameUI.highlightWinner(winnerInfo.line)
        this.saveGameToHistory(winnerInfo.player, winnerInfo.line)
        return true
      }

      if (!this.state.board.includes(null)) {
        this.state.isGameOver = true
        this.stopTurnTimer()
        GameUI.updateStatus("¡Es un empate!")
        this.saveGameToHistory("draw")
        return true
      }
      return false
    },

    saveGameToHistory: function (result, winningLine = null) {
      const gameEndTime = Date.now()
      const gameDuration = Math.floor((gameEndTime - this.state.gameStartTime) / 1000)

      const gameResult = {
        result: result,
        duration: gameDuration,
        playersUsed: this.state.playersUsedInGame,
        winningLine: winningLine,
      }

      // Guardar usando AJAX
      GameHistory.saveGameResult(gameResult)
    },

    calculateWinner: function () {
      const lines = [
        [0, 1, 2], // FILAS
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Columnas
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonales
        [2, 4, 6],
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
      generateSolvableGrid()
      this.state.board.fill(null)
      this.state.currentPlayer = "X"
      this.state.isGameOver = false
      this.state.selectedSquare = null
      this.state.usedPlayers.clear()
      this.state.gameStartTime = Date.now()
      this.state.playersUsedInGame = []
      GameUI.renderBoard()
      GameUI.updateStatus(`Siguiente jugador: ❌`)
      this.startTurnTimer()
    },
  }

  Game.init()
})
