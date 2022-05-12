const canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#302c2c";

const ctx = canvas.getContext("2d");

const startBtn = document.querySelector("#start");
const restartBtn = document.querySelector("#restart");

let circleX = 150;
let circleY = 170;
let circleRadius = 25;
let ballSpeedValue = 3;
let ballDirectionX = ballSpeedValue;
let ballDirectionY = ballSpeedValue;

const paddleWidth = 150;
const paddleHeight = 15;
const paddleSpeedValue = 5;
let paddleX = canvas.width / 2 - paddleWidth / 2;
let paddleY = canvas.height - paddleHeight;

let isPaddleGoingLeft = false;
let isPaddleGoingRight = false;

let score = 0;
let gameOver = false;

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.fillStyle = "tomato";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.closePath();
  if (isPaddleGoingLeft) {
    if (paddleX > 0) {
      paddleX -= paddleSpeedValue;
    }
  } else if (isPaddleGoingRight) {
    if (paddleX < canvas.width - paddleWidth) {
      paddleX += paddleSpeedValue;
    }
  }
}

function drawScore() {
  ctx.beginPath();
  ctx.font = "30px sans-serif";
  ctx.fillStyle = "green";
  ctx.fillText(`Score : ${score}`, 10, 30);
  ctx.closePath();
}

function reverseMotionX() {
  ballDirectionX *= -1;
}

function reverseMotionY() {
  ballDirectionY *= -1;
}

function increaseSpeed() {
  ballDirectionX *= 1.2;
  ballDirectionY *= 1.2;
}

function circleBounce() {
  if (circleX > canvas.width - circleRadius) {
    reverseMotionX();
  }
  if (circleY > canvas.height - circleRadius) {
    if (circleX < paddleX || circleX > paddleX + paddleWidth) {
      gameOver = true;
    } else {
      score += 1;
      increaseSpeed();
      reverseMotionY();
    }
  }
  if (circleX < circleRadius) {
    reverseMotionX();
  }
  if (circleY < circleRadius) {
    reverseMotionY();
  }
  circleY += ballDirectionY;
  circleX += ballDirectionX;
  drawCircle();
}

let animationFrameId;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circleBounce();
  drawPaddle();
  drawScore();

  if (gameOver) {
    cancelAnimationFrame(animationFrameId);
    restartBtn.style.display = "block";
  } else {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function start() {
  startBtn.style.display = "none";
  canvas.style.display = "block";

  animate();
}

function restart() {
  circleX = 150;
  circleY = 170;
  gameOver = false;
  score = 0;
  ballDirectionX = ballSpeedValue;
  ballDirectionY = ballSpeedValue;
  start();
}

window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";

  start();
  startBtn.addEventListener("click", () => {
    start();
  });

  restartBtn.addEventListener("click", () => {
    restart();
  });

  document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
      isPaddleGoingLeft = true;
    }
    if (event.code === "ArrowRight") {
      isPaddleGoingRight = true;
    }
  });

  document.addEventListener("keyup", event => {
    isPaddleGoingLeft = false;
    isPaddleGoingRight = false;
  });
});
