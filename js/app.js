/*-------------------------------- Constants --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let boardState
let playerTurn 
let isWinner

/*------------------------ Cached Element References ------------------------*/
const squaresEl = [...document.querySelectorAll('.squares')]
const messageEl = document.querySelector('#message')
const resetBtn = document.getElementById('reset')

/*----------------------------- Event Listeners -----------------------------*/

squaresEl.forEach(square => square.addEventListener('click', handleClick))

resetBtn.addEventListener('click', init)
/*-------------------------------- Functions --------------------------------*/

init()

function init(){
  messageEl.innerText = "Player 1, pick a square!"
  messageEl.style.color = 'blue'
  boardState = [null, null, null, null, null, null, null, null, null]
  squaresEl.innerText = ''
  isWinner = null
  playerTurn = 1
  render(boardState)
}

//renders responsibility is to take that board state and render that to the screen
function render(boardState) {
  //first half of render is rendering the colors and letter to the div based on the squares idx
  boardState.forEach((square, idx) => {
    let divColor
    let divLetter
    if (square === 1){
      divColor = 'blue'
      divLetter = 'X'
      messageEl.style.color = 'purple'} 
    if (square === -1){
      divColor = 'purple'
      divLetter = 'O'
      messageEl.style.color = 'blue'}
    if (square === null) {
      divColor = 'white'
      divLetter = ''}
    if (isWinner === -1){
      messageEl.style.color = 'purple'}
    if (isWinner === 1){
      messageEl.style.color = 'blue'}

    squaresEl[idx].style.background = divColor
    squaresEl[idx].innerText = divLetter
  });
  //second half of render is going to be in charge of rendering our messages for whose turn or winner!
  if (!isWinner && playerTurn === 1){
    messageEl.innerText = `It is Player 1's Turn, place your X in any open square!`
  } else if (!isWinner && playerTurn === -1){
    messageEl.innerText = `It is Player 2's Turn, place your O in any open square!`
  } else if (isWinner === "T") {
    messageEl.innerText = `Cat's game!!! It's a Tie!!`
  } else if (isWinner) {
    messageEl.innerText = `Congratulations! ${isWinner === 1 ? "Player 1, X's" : "Player 2, O's"} wins!!!`
  }
  
}

function handleClick(evt){
  //assigning value to the board state as an integer
  let squareIndex = parseInt(evt.target.id.slice(2))
  console.log(squareIndex)
  if (boardState[squareIndex] || isWinner) {
    //'return' alone in a function shortcircuts so that the square can not be clicked, disables the game 
    return
  }
  boardState[squareIndex] = playerTurn
  console.log(boardState)
  //switch players by taking the value of player turn *-1 and then resetting that value to player turn
  playerTurn *= -1
  console.log(playerTurn)
  //to return the indicator for render, run get winner
  isWinner = getWinner()
  render(boardState)
}

function getWinner() {
  // if 3 idx in a row have an absolute value of 3, either -3 or 3, someone wins 
  if (Math.abs(boardState[0] + boardState[1] + boardState[2]) === 3) return boardState[0];
  if (Math.abs(boardState[3] + boardState[4] + boardState[5]) === 3) return boardState[3]; 
  if (Math.abs(boardState[6] + boardState[7] + boardState[8]) === 3) return boardState[6];
  if (Math.abs(boardState[0] + boardState[3] + boardState[6]) === 3) return boardState[0];
  if (Math.abs(boardState[1] + boardState[4] + boardState[7]) === 3) return boardState[1];
  if (Math.abs(boardState[2] + boardState[5] + boardState[8]) === 3) return boardState[2];
  if (Math.abs(boardState[0] + boardState[4] + boardState[8]) === 3) return boardState[0];
  if (Math.abs(boardState[2] + boardState[4] + boardState[6]) === 3) return boardState[2];
  console.log(boardState)
  //now check if there is a tie or null(game not finished/nowinner)
  if (boardState.includes(null)) {
    return null 
  } else {
    return "T"}

}