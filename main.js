//BUTTONS


// #region GAME LOGIC AND DATA

//DATA
let clickCount = 0
let height = 120
let width = 100
let inflationRate = 20
let maxSize = 300
let currentPopCount = 0
let highestPopCount = 0
let gameLength = 5000
let clockId = 0
let timeRemaining = 0
let currentPlayer = {}

function startGame(){
  document.getElementById("game-controls").classList.remove("hidden")
  document.getElementById("main-controls").classList.add("hidden")
  startClock()
  setTimeout(stopGame, gameLength)
}

function startClock(){
  timeRemaining = gameLength
  drawClock()
  clockId = setInterval(drawClock, 1000)
}

function stopClock(){
  clearInterval(clockId)
}

function drawClock(){
  let countdownElement = document.getElementById("countdown")
  countdownElement.innerText = (timeRemaining / 1000).toString()
  timeRemaining -= 1000
}

function inflate(){
  clickCount++
  height += inflationRate
  width += inflationRate

  if(height >= maxSize){
    console.log("balloon has popped")
    let balloonElement = document.getElementById("balloon")
    balloonElement.classList.add("teal")
    currentPopCount++
    height = 0
    width = 0
  }

  draw()
}

function draw(){
  let balloonElement = document.getElementById("balloon")
  let clickCountElement = document.getElementById("click-count")
  let popCountElement = document.getElementById("pop-count")
  let highPopCountElement = document.getElementById("high-pop-count")
  let playerNameElement = document.getElementById("player-name")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  clickCountElement.innerText = clickCount.toString()
  popCountElement.innerText = currentPopCount.toString()
  highPopCountElement.innerText = currentPlayer.topScore.toString()

  playerNameElement.innerText = currentPlayer.name
}

function stopGame(){
  console.log("game has ended")

  document.getElementById("main-controls").classList.remove("hidden")
  document.getElementById("game-controls").classList.add("hidden")

  clickCount = 0
  height = 120
  width = 100

  if(currentPopCount > currentPlayer.topScore){
    currentPlayer.topScore = currentPopCount
    savePlayers()
  }

  currentPopCount = 0

  stopClock()
  draw()
}

// #endregion

let players = []
loadPlayers()

function setPlayer(event){
  event.preventDefault()
  let form = event.target

  let playerName = form.playerName.value

  currentPlayer = players.find(player => player.name == playerName)

  if(!currentPlayer){
    currentPlayer = {name: playerName, topScore: 0}
    players.push(currentPlayer)
    savePlayers()

  }

  form.reset()
  document.getElementById("game").classList.remove("hidden")
  form.classList.add("hidden")
  draw()
}

function changePlayer(){
  document.getElementById("player-form").classList.remove("hidden")
  document.getElementById("game").
classList.add("hidden")
}

function savePlayers(){
  window.localStorage.setItem("players", JSON.stringify(players))
}function loadPlayers(){
  let playersData = JSON.parse(window.localStorage.getItem("players"))
  if(playersData){
    players = playersData
  }
}