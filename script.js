const canvas = document.querySelector('canvas')
canvas.style.backgroundColor = '#302c2c'
canvas.style.border = '1px solid black'

const ctx = canvas.getContext('2d')

const startBtn = document.querySelector('#start')
const restartBtn = document.querySelector('#restart')

const ballImg = new Image()
ballImg.src =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVyVbkx5tj1tT8vpnECHzG-JYIE6_c8WzJWg&usqp=CAU'

const bgImg = new Image()
bgImg.src =
  'data:image/jpeg;base64,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'

const ballRadius = 25
const paddleWidth = 120
const paddleHeight = 15
const paddleY = canvas.height - paddleHeight
const paddleSpeed = 5

let ballX = 200
let ballY = 200
let ballSpeedX = 2
let ballSpeedY = 2

let paddleX = canvas.width / 2 - paddleWidth / 2
let isMovingLeft = false
let isMovingRight = false

let animateId
let gameOver = false
let score = 0

const drawBall = () => {
  ctx.beginPath()
  ctx.fillStyle = 'tomato'
  // ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
  ctx.drawImage(ballImg, ballX, ballY, ballRadius, ballRadius)
  ctx.fill()
  ctx.closePath()
}

const drawPaddle = () => {
  ctx.beginPath()
  ctx.fillStyle = 'teal'
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight)
  ctx.fill()
  ctx.closePath()
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)

  drawBall()
  ballX += ballSpeedX
  ballY += ballSpeedY
  drawPaddle()
  if (isMovingLeft && paddleX > 0) {
    paddleX -= paddleSpeed
  }
  if (isMovingRight && paddleX + paddleWidth < canvas.width) {
    paddleX += paddleSpeed
  }

  ctx.font = '48px serif'
  ctx.fillText(score, 10, 48)

  // Right wall
  if (ballX + ballRadius > canvas.width) {
    ballSpeedX *= -1
  }
  // Left wall
  if (ballX - ballRadius < 0) {
    ballSpeedX *= -1
  }
  // Top wall
  if (ballY - ballRadius < 0) {
    ballSpeedY *= -1
  }
  // Paddle
  if (
    ballY + ballRadius > canvas.height - paddleHeight &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    score += 1
    ballSpeedX *= 1.2
    ballSpeedY *= -1.2
  }

  // Bottom wall
  if (ballY + ballRadius > canvas.height) {
    gameOver = true
  }
  if (gameOver) {
    cancelAnimationFrame(animateId)
    restartBtn.style.display = 'block'
    ctx.fillStyle = 'red'
    ctx.font = '48px serif'
    ctx.fillText('GAME OVER', canvas.width / 2 - 160, canvas.height / 2)
  } else {
    // Recursivity - In this case, it is what "animates" everything
    animateId = requestAnimationFrame(animate)
  }
}

const start = () => {
  startBtn.style.display = 'none'
  canvas.style.display = 'block'

  animate()
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
    restartBtn.style.display = 'none'
    ballX = 200
    ballY = 200
    ballSpeedX = 2
    ballSpeedY = 2

    paddleX = canvas.width / 2 - paddleWidth / 2
    isMovingLeft = false
    isMovingRight = false

    gameOver = false
    score = 0

    start()
  })

  document.addEventListener('keypress', event => {
    if (event.key === 'a') {
      // move paddle to the left
      isMovingLeft = true
    }
    if (event.key === 'd') {
      // move paddle to the right
      isMovingRight = true
    }
  })
  document.addEventListener('keyup', () => {
    // Stop moving the paddle
    isMovingLeft = false
    isMovingRight = false
  })
})
