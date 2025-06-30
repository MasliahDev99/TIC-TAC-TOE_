// jquery
const $ = window.jQuery

$(document).ready(() => {
  // =================================
  // GAME DATA
  // =================================
  const GameData = {
    allCategories: [  
      // Equipos Uruguayos
      { name: "Nacional", id: "nacional", image: "../public/assets/nacional.png" },
      { name: "Peñarol", id: "penarol", image: "../public/assets/penarol.png" },
      { name: "Defensor Sp.", id: "defensor", image: "../public/assets/defensor.jpg" },
      { name: "Danubio", id: "danubio", image: "../public/assets/danubio.png" },
      { name: "Wanderers", id: "wanderers", image: "../public/assets/wanderers.png" },
      // Ligas extranjeras
      { name: "Jugó en Italia", id: "serie_a" },
      { name: "Jugó en España", id: "laliga" },
      { name: "Jugó en Argentina", id: "liga_argentina" },
      { name: "Jugó en Brasil", id: "brasil" },
      // Competiciones
      { name: "Copa Libertadores", id: "libertadores" },
      { name: "Copa Sudamericana", id: "sudamericana" },
      { name: "Campeón Uruguayo", id: "campeon_uruguayo" },
      // Seleccion
      { name: "Selección Uruguaya", id: "uruguay_nt" },
      { name: "+10 Goles en Selección", id: "goles_seleccion" },
      // Logros y estadisticas
      { name: "Goles en Clásicos", id: "goles_clasicos" },
      { name: "Vendido a Europa", id: "vendido_europa" },
      { name: "Debutó en el S.XXI", id: "debut_xxi" },
      { name: "Zurdo", id: "zurdo" },
      { name: "Defensor", id: "pos_defensor" },
      { name: "Delantero", id: "pos_delantero" },
    ],
    rowCategories: [],
    colCategories: [],
    playerDatabase: {
      // Jugadores
      "luis suarez": [
        "nacional",
        "vendido_europa",
        "laliga",
        "uruguay_nt",
        "goles_clasicos",
        "campeon_uruguayo",
        "goles_seleccion",
        "debut_xxi",
        "pos_delantero",
        "libertadores",
      ],
      "diego forlan": [
        "penarol",
        "vendido_europa",
        "laliga",
        "serie_a",
        "uruguay_nt",
        "campeon_uruguayo",
        "goles_seleccion",
        "pos_delantero",
        "liga_argentina",
        "brasil",
      ],
      "alvaro recoba": [
        "nacional",
        "danubio",
        "vendido_europa",
        "serie_a",
        "uruguay_nt",
        "goles_clasicos",
        "campeon_uruguayo",
        "zurdo",
        "pos_delantero",
      ],
      "edinson cavani": [
        "danubio",
        "vendido_europa",
        "serie_a",
        "laliga",
        "uruguay_nt",
        "goles_seleccion",
        "debut_xxi",
        "pos_delantero",
        "liga_argentina",
      ],
      "diego godin": [
        "nacional",
        "vendido_europa",
        "laliga",
        "serie_a",
        "uruguay_nt",
        "goles_seleccion",
        "debut_xxi",
        "pos_defensor",
        "brasil",
      ],
      "antonio pacheco": [
        "penarol",
        "wanderers",
        "goles_clasicos",
        "campeon_uruguayo",
        "serie_a",
        "pos_delantero",
        "zurdo",
      ],
      "marcelo zalayeta": [
        "penarol",
        "danubio",
        "vendido_europa",
        "serie_a",
        "goles_clasicos",
        "campeon_uruguayo",
        "pos_delantero",
        "debut_xxi",
      ],
      "federico valverde": ["penarol", "vendido_europa", "laliga", "uruguay_nt", "debut_xxi", "campeon_uruguayo"],
      "ronald araujo": ["wanderers", "vendido_europa", "laliga", "uruguay_nt", "debut_xxi", "pos_defensor"],
      "giorgian de arrascaeta": ["defensor", "vendido_europa", "libertadores", "uruguay_nt", "brasil", "debut_xxi"],
      "nicolas lodeiro": [
        "nacional",
        "vendido_europa",
        "libertadores",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
        "zurdo",
      ],
      "martin caceres": ["defensor", "vendido_europa", "serie_a", "laliga", "uruguay_nt", "debut_xxi", "pos_defensor"],
      "walter gargano": [
        "penarol",
        "danubio",
        "vendido_europa",
        "serie_a",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
      ],
      "sebastian abreu": [
        "nacional",
        "defensor",
        "uruguay_nt",
        "goles_clasicos",
        "liga_argentina",
        "brasil",
        "laliga",
        "pos_delantero",
      ],
      "ignacio gonzalez": [
        "danubio",
        "nacional",
        "vendido_europa",
        "laliga",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
      ],
      "maximiliano gomez": ["defensor", "vendido_europa", "laliga", "uruguay_nt", "debut_xxi", "pos_delantero"],
      "cristian rodriguez": [
        "penarol",
        "vendido_europa",
        "uruguay_nt",
        "goles_seleccion",
        "campeon_uruguayo",
        "debut_xxi",
        "zurdo",
        "brasil",
      ],
      "abel hernandez": ["penarol", "vendido_europa", "serie_a", "uruguay_nt", "debut_xxi", "pos_delantero", "brasil"],
      "gaston pereiro": [
        "nacional",
        "vendido_europa",
        "serie_a",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
        "zurdo",
      ],
      "matias vecino": [
        "nacional",
        "serie_a",
        "uruguay_nt",
        "vendido_europa",
        "debut_xxi",
      ],
      "josema gimenez": ["danubio", "vendido_europa", "laliga", "uruguay_nt", "debut_xxi", "pos_defensor"],
      "lucas torreira": ["wanderers", "vendido_europa", "serie_a", "laliga", "uruguay_nt", "debut_xxi"],
      // Nuevos jugadores agregados
      "fernando muslera": [
        "nacional",
        "vendido_europa",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
      ],
      "darwin nuñez": [
        "penarol",
        "vendido_europa",
        "uruguay_nt",
        "pos_delantero",
        "debut_xxi",
      ],
      "rodrigo bentancur": [
        "danubio",
        "vendido_europa",
        "serie_a",
        "uruguay_nt",
        "debut_xxi",
      ],
      "georgian de arrascaeta": [
        "defensor",
        "uruguay_nt",
        "libertadores",
        "brasil",
        "debut_xxi",
      ],
      "matias vecino": [
        "nacional",
        "serie_a",
        "uruguay_nt",
        "vendido_europa",
        "debut_xxi",
      ],
      "nico de la cruz": [
        "liverpool",
        "uruguay_nt",
        "libertadores",
        "liga_argentina",
        "debut_xxi",
      ],
      "sergio rochet": [
        "nacional",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
      ],
      "facundo pellistri": [
        "penarol",
        "uruguay_nt",
        "vendido_europa",
        "debut_xxi",
      ],
      "facundo torres": [
        "penarol",
        "uruguay_nt",
        "vendido_europa",
        "debut_xxi",
      ],
      "brian rodriguez": [
        "penarol",
        "uruguay_nt",
        "vendido_europa",
        "debut_xxi",
      ],
      "martin satriano": [
        "nacional",
        "uruguay_nt",
        "serie_a",
        "vendido_europa",
        "debut_xxi",
      ],
      
      "andres scotti": [
        "nacional",
        "uruguay_nt",
        "campeon_uruguayo",
        "pos_defensor",
      ],
      "egidio arevalo rios": [
        "penarol",
        "uruguay_nt",
        "campeon_uruguayo",
        "brasil",
        "liga_argentina",
        "debut_xxi",
      ],
      "diego lugano": [
        "nacional",
        "uruguay_nt",
        "pos_defensor",
        "brasil",
        "vendido_europa",
        "goles_seleccion",
      ],
      "martin silva": [
        "defensor",
        "uruguay_nt",
        "campeon_uruguayo",
        "libertadores",
        "debut_xxi",
      ],
      "jorge fucile": [
        "nacional",
        "uruguay_nt",
        "campeon_uruguayo",
        "debut_xxi",
        "pos_defensor",
      ],
      "sebastian coates": [
        "nacional",
        "uruguay_nt",
        "pos_defensor",
        "vendido_europa",
        "campeon_uruguayo",
        "debut_xxi",
      ],
      "guillermo varela": [
        "penarol",
        "uruguay_nt",
        "debut_xxi",
        "vendido_europa",
        "pos_defensor",
      ],
      "diego rossi": [
        "penarol",
        "uruguay_nt",
        "vendido_europa",
        "debut_xxi",
        "pos_delantero",
      ],
      "jonathan rodriguez": [
        "penarol",
        "uruguay_nt",
        "vendido_europa",
        "campeon_uruguayo",
        "pos_delantero",
        "debut_xxi",
      ],
      "nicolas de la cruz": [
        "liverpool",
        "uruguay_nt",
        "liga_argentina",
        "libertadores",
        "debut_xxi",
      ],
      "mauricio pereyra": [
        "nacional",
        "vendido_europa",
        "debut_xxi",
      ],
      "rodrigo lopez": [
        "danubio",
        "goles_clasicos",
        "liga_argentina",
        "pos_delantero",
      ],
      "pablo garcia": [
        "peñarol",
        "uruguay_nt",
        "campeon_uruguayo",
        "serie_a",
        "vendido_europa",
        "zurdo",
      ],
      "richard morales": [
        "nacional",
        "uruguay_nt",
        "campeon_uruguayo",
        "goles_seleccion",
        "pos_delantero",
      ],
      "gonzalo de los santos": [
        "penarol",
        "uruguay_nt",
        "laliga",
        "campeon_uruguayo",
      ],
      "nicolas oliva": [
        "danubio",
        "pos_defensor",
        "campeon_uruguayo",
      ],
      "ignacio laquintana": [
        "defensor",
        "debut_xxi",
        "vendido_europa",
      ],
      "juan manuel sanabria": [
        "nacional",
        "debut_xxi",
        "vendido_europa",
      ],
      "ramon ariass": [
        "defensor",
        "pos_defensor",
        "debut_xxi",
      ],
    },
    validatePlayer: function (name, rowCategory, colCategory) {
      const playerName = name.toLowerCase().trim()
      const playerData = this.playerDatabase[playerName]
      if (!playerData) return false
      return playerData.includes(rowCategory) && playerData.includes(colCategory)
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
      boardElement
        .find(`.square[data-index=${index}]`)
        .html(squareContent) 
        .addClass(`filled ${symbolClass}`)
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
      board: Array(9).fill(null), // Representa el tablero ( 9 celdas vacias)
      currentPlayer: "X",        // Jugador actual (❌ o ⭕️)
      isGameOver: false,        // Indica si el juego ha terminado
      selectedSquare: null,    // Indice de la celda seleccionada
      turnTimer: null,        // Temporizador del turno
      timeLeft: 45,          // Tiempo restante para el turno actual
      usedPlayers: new Set(),
    },

    init: function () {
      // Inicializamos el juego: resetea el estado y vincula los eventos
      this.resetGame()
      this.bindEvents()
    },


    bindEvents: function () {
      // Vinculamos los eventos de interaccion con el tablero y los botones
      $("#game-board").on("click", ".square:not(.filled)", (e) => {
        if (this.state.isGameOver) return       // No permite interaccion si el juego ha terminado
        const index = $(e.currentTarget).data("index")  // Obtenemos el indice de la ceulda seleccionada
        this.handleSquareClick(index)         // manejamos el clic en la celda
      })

      $("#reset-button").on("click", () => this.resetGame())  // Reseteamos el juego al hacer clic en el botón de reinicio


      $("#skip-button").on("click", () => {
        if (this.state.isGameOver) return   // No permite interaccin si el juego ha terminado
        GameUI.showToast("Turno saltado", "info")   // Muestra mensaje indicando que el turno fue saltado
        this.switchPlayer()                 // Cambia al siguiente turno
      })

      GameUI.formElement.on("submit", (e) => {
        e.preventDefault()        // Previene el comportamiento por defecto del formulario
        this.handlePlayerSubmit($("#player-name-input").val())   // Manejamos el envío del nombre del jugador
      })

      $("#cancel-button").on("click", () => {
        GameUI.hideDialog() // Ocultamos el cuadro de dialogo
      })
    },

    startTurnTimer: function () {
      // Inicia el temporizador del turno
      this.stopTurnTimer()  // Detiene cualquier temporizador previo
      this.state.timeLeft = 45  // Reinicia el tiempo restante
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
      const colCat = GameData.colCategories[index % 3].id  // obtenemos la categoria de la columna

      if (GameData.validatePlayer(playerName, rowCat, colCat)) {
        // Valida si el jugador cumple con las categorías seleccionadas
        this.state.board[index] = this.state.currentPlayer  // Marcamos la celda con el jugador actual
        GameUI.updateSquare(index, this.state.currentPlayer, playerName) // Actualizamos la celda en la interfaz
        this.state.usedPlayers.add(playerNameNormalized)
        GameUI.showToast("¡Correcto!", "success") // Mostramos mensaje de exito
        if (this.checkEndCondition()) return  // Verificamos si el juego ha terminado
      } else {
        GameUI.showToast("¡Incorrecto! Turno perdido.", "error") // Muestra mensaje de error
      }

      this.switchPlayer()// Cambia al siguiente jugador
      GameUI.hideDialog()// Oculta el cuadro de diálogo
    },

    switchPlayer: function () {
      // cambia al siguiente jugador
      if (this.state.isGameOver) return
      this.state.currentPlayer = this.state.currentPlayer === "X" ? "O" : "X"// alterna ente X o 0
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
      GameUI.renderBoard()
      GameUI.updateStatus(`Siguiente jugador: ❌`)
      this.startTurnTimer()
    },
  }

  Game.init()
})
