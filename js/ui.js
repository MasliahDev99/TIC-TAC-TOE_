const jQuery = window.jQuery
const GameData = window.GameData // Declare the GameData variable

window.GameUI = (($) => {
  const boardElement = $("#game-board")
  const statusElement = $("#game-status")
  const dialogElement = $("#player-input-dialog")
  const inputElement = $("#player-name-input")
  const formElement = $("#player-input-form")
  const toastContainer = $("#toast-container")

  function renderBoard() {
    boardElement.empty()
    // Top-left empty cell
    boardElement.append('<div class="grid-cell"></div>')

    // Column headers
    GameData.colCategories.forEach((cat) => {
      const header = $(`
                <div class="grid-cell header-cell">
                    <img src="${cat.image}" alt="${cat.name}">
                    <div class="header-text">${cat.name}</div>
                </div>
            `)
      boardElement.append(header)
    })

    // Rows
    for (let i = 0; i < 3; i++) {
      // Row header
      const rowCat = GameData.rowCategories[i]
      const rowHeader = $(`
                <div class="grid-cell header-cell">
                    <span>${rowCat.name}</span>
                </div>
            `)
      boardElement.append(rowHeader)

      // Squares
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

  return {
    renderBoard,
    updateSquare,
    updateStatus,
    showDialog,
    hideDialog,
    highlightWinner,
    showToast,
    formElement, // Expose for event binding
  }
})(jQuery)
