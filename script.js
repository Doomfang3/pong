const canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#302c2c'

const bgImg = new Image()
bgImg.src = './dark-sphynx-cat-wd2322.jpg'

const ctx = canvas.getContext('2d')

const startBtn = document.querySelector('#start')
const restartBtn = document.querySelector('#restart')

const ballSpeed = 3
const paddleSpeed = 5
const canvasWidth = canvas.width
const canvasHeight = canvas.height
const startingPaddlePosition = canvasWidth / 2 - 75

let isGameOver = false
let circleX = 150
let circleY = 170
let circleRadius = 25
let directionX = ballSpeed
let directionY = ballSpeed
let paddleX = startingPaddlePosition
let paddleMovement = 0
let score = 0

const drawBall = () => {
  ctx.beginPath()
  ctx.fillStyle = 'limegreen'
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
}

const moveBall = () => {
  if (circleX > canvasWidth - circleRadius) {
    directionX *= -1
  }
  if (circleX < 0 + circleRadius) {
    directionX *= -1
  }
  if (circleY < 0 + circleRadius) {
    directionY *= -1
  }
  if (
    circleY > canvasHeight - circleRadius - 20 &&
    circleY < canvasHeight &&
    circleX >= paddleX &&
    circleX <= paddleX + 150
  ) {
    directionY *= -1.5
    score += 1
  }
  circleX += directionX
  circleY += directionY
}

const drawPaddle = () => {
  ctx.beginPath()
  ctx.fillStyle = 'tomato'
  ctx.fillRect(paddleX, canvasHeight - 20, 150, 20)
  ctx.closePath()
}

const movePaddle = () => {
  if (paddleX + paddleMovement <= canvasWidth - 150 && paddleX + paddleMovement >= 0) {
    paddleX += paddleMovement
  }
}

const drawScore = () => {
  ctx.beginPath()
  ctx.font = '48px sans-serif'
  ctx.fillText(score, 10, 50)
  ctx.closePath()
}

const drawGameOver = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.beginPath()
  ctx.font = '48px sans-serif'
  ctx.fillText('GAME OVER', canvasWidth / 3, canvasHeight / 2)
  ctx.closePath()

  ctx.beginPath()
  ctx.font = '48px sans-serif'
  ctx.fillText(score, canvasWidth / 3 + 60, canvasHeight / 2 + 60)
  ctx.closePath()
}

const animate = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight)
  moveBall()
  drawBall()
  movePaddle()
  drawPaddle()
  drawScore()

  let requestAnimationFrameId
  if (circleY > canvasHeight - 25) {
    isGameOver = true
  }
  if (isGameOver) {
    cancelAnimationFrame(requestAnimationFrameId)
    drawGameOver()
    restartBtn.style.display = 'block'
  } else {
    requestAnimationFrameId = requestAnimationFrame(animate)
  }
}

const start = () => {
  canvas.style.display = 'block'
  startBtn.style.display = 'none'
  restartBtn.style.display = 'none'
  animate()
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      paddleMovement = -paddleSpeed
    }
    if (event.key === 'ArrowRight') {
      paddleMovement = paddleSpeed
    }
  })
  document.addEventListener('keyup', () => {
    paddleMovement = 0
  })
}

window.addEventListener('load', () => {
  canvas.style.display = 'none'
  restartBtn.style.display = 'none'
  startBtn.addEventListener('click', () => {
    // start
    start()
  })

  restartBtn.addEventListener('click', () => {
    // restart
    isGameOver = false
    circleX = 150
    circleY = 170
    directionX = ballSpeed
    directionY = ballSpeed
    paddleX = startingPaddlePosition
    score = 0
    start()
  })
})
