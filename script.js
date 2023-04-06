window.addEventListener('load', () => {
  const canvas = document.querySelector('canvas')
  canvas.style.backgroundColor = '#302c2c'

  const ctx = canvas.getContext('2d')

  const startBtn = document.querySelector('#start')
  const restartBtn = document.querySelector('#restart')

  canvas.style.display = 'none'
  restartBtn.style.display = 'none'

  const bgImg = new Image()
  bgImg.src =
    'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71UoamfdRxL.jpg'

  const ballRadius = 20
  let paddleWidth = 100
  const paddleHeight = 20
  const paddleSpeed = 2

  let paddleX = canvas.width / 2 - paddleWidth / 2

  let isMovingLeft = false
  let isMovingRight = false

  let ballX = 100
  let ballY = 100
  let ballSpeedX = 2
  let ballSpeedY = 2

  let score = 0
  let gameOver = false
  let animateId

  const drawBall = () => {
    ctx.beginPath()
    ctx.fillStyle = 'tomato'
    // x, y, radius, startAngle, endAngle
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
  }

  const drawPaddle = () => {
    ctx.beginPath()
    ctx.fillStyle = 'teal'
    // xPos, yPos, width, height
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fill()
    ctx.closePath()
  }

  const animate = () => {
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
    drawBall()
    drawPaddle()

    // Right wall
    if (ballX > canvas.width - ballRadius) {
      ballSpeedX *= -1
    }
    // Floor
    if (
      ballY > canvas.height - paddleHeight - ballRadius &&
      ballX > paddleX &&
      ballX < paddleX + paddleWidth
    ) {
      ballY -= 1
      ballSpeedY *= -1.5
      paddleWidth *= 0.9
      score += 1
    }
    // Left wall
    if (ballX < ballRadius) {
      ballSpeedX *= -1
    }
    // Ceiling
    if (ballY < ballRadius) {
      ballSpeedY *= -1
    }

    if (isMovingLeft && paddleX > 0) {
      paddleX -= paddleSpeed
    } else if (isMovingRight && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleSpeed
    }

    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballY > canvas.height - ballRadius) {
      gameOver = true
    }
    ctx.font = '24px sans-serif'
    ctx.fillText(score, 10, 30)
    if (gameOver) {
      cancelAnimationFrame(animateId)
      //Display gameover text
      ctx.font = '48px sans-serif'
      ctx.fillText('GAME OVER', canvas.width / 2 - 150, canvas.height / 2)
      restartBtn.style.display = 'block'
    } else {
      animateId = requestAnimationFrame(animate)
    }
  }

  const start = () => {
    startBtn.style.display = 'none'
    canvas.style.display = 'block'
    animate()
  }

  startBtn.addEventListener('click', start)

  restartBtn.addEventListener('click', () => {
    restartBtn.style.display = 'none'

    paddleWidth = 100

    paddleX = canvas.width / 2 - paddleWidth / 2

    isMovingLeft = false
    isMovingRight = false

    ballX = 100
    ballY = 100
    ballSpeedX = 2
    ballSpeedY = 2

    score = 0
    gameOver = false

    start()
  })

  document.addEventListener('keydown', event => {
    console.log(event)
    if (event.key === 'a' || event.key === 'A') {
      isMovingLeft = true
    }
    if (event.key === 'd' || event.key === 'D') {
      isMovingRight = true
    }
  })

  document.addEventListener('keyup', event => {
    console.log(event)
    if (event.key === 'a' || event.key === 'A') {
      isMovingLeft = false
    }
    if (event.key === 'd' || event.key === 'D') {
      isMovingRight = false
    }
  })
})
