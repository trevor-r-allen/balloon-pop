let startButton = document.getElementById("start-button")
let inflateButton = document.getElementById("inflate-button")

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

function startGame(){
  startButton.setAttribute("disabled", "true")
  inflateButton.removeAttribute("disabled")
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
    currentPopCount++
    height = 0
    width = 0

  }

  draw()

}

function draw(){
  let balloonElement = document.getElementById ("balloon")
  let clickCountElement = document.getElementById("click-count")
  let popCountElement = document.getElementById("pop-count")
  let highPopCountElement = document.getElementById("high-pop-count")

  balloonElement.style.height = height + "px"
  balloonElement.style.width = width + "px"

  clickCountElement.innerText = clickCount.toString()

  popCountElement.innerText = currentPopCount.toString()
  highPopCountElement.innerText = highestPopCount.toString()
}

function stopGame(){
  console.log("game has ended")

  inflateButton.setAttribute("disabled", "true")
  startButton.removeAttribute("disabled")

  clickCount = 0
  height = 120
  width = 100

  if(currentPopCount > highestPopCount){
    highestPopCount = currentPopCount
  }

  currentPopCount = 0

  stopClock()
  draw()

}