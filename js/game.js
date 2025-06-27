// Import necessary libraries and declare variables
const $ = window.$ // Assuming jQuery is available globally
const GameUI = {} // Declare GameUI variable
const GameData = {} // Declare GameData variable

$(document).ready(() => {
  const Game = {
    state: {
      board: Array(9).fill(null),
      currentPlayer: "X",
      isGameOver: false,
      selectedSquare: null,
    },

    init: function () {
      GameUI.renderBoard()
      this.resetGame()
      this.bindEvents()
    },

    bindEvents: function () {
      $("#game-board").on("click", ".square:not(.filled)", (e) => {
        if (this.state.isGameOver) return
        const index = $(e.currentTarget).data("index")
        this.handleSquareClick(index)
      })

      $("#reset-button").on("click", () => this.resetGame())

      GameUI.formElement.on("submit", (e) => {
        e.preventDefault()
        const playerName = $("#player-name-input").val()
        this.handlePlayerSubmit(playerName)
      })

      $("#cancel-button").on("click", () => GameUI.hideDialog())
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

        if (this.checkEndCondition()) {
          return
        }
      } else {
        GameUI.showToast("¡Incorrecto! Turno perdido.", "error")
      }

      this.switchPlayer()
      GameUI.hideDialog()
    },

    switchPlayer: function () {
      this.state.currentPlayer = this.state.currentPlayer === "X" ? "O" : "X"
      GameUI.updateStatus(`Siguiente jugador: ${this.state.currentPlayer === "X" ? "❌" : "⭕"}`)
    },

    checkEndCondition: function () {
      const winnerInfo = this.calculateWinner()
      if (winnerInfo) {
        this.state.isGameOver = true
        GameUI.updateStatus(`¡Ganador: ${winnerInfo.player === "X" ? "❌" : "⭕"}!`)
        GameUI.highlightWinner(winnerInfo.line)
        return true
      }

      if (!this.state.board.includes(null)) {
        this.state.isGameOver = true
        GameUI.updateStatus("¡Es un empate!")
        return true
      }
      return false
    },

    calculateWinner: function () {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
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
      this.state.board.fill(null)
      this.state.currentPlayer = "X"
      this.state.isGameOver = false
      this.state.selectedSquare = null
      GameUI.renderBoard()
      GameUI.updateStatus(`Siguiente jugador: ❌`)
    },
  }

  Game.init()
})
