const canvas = document.querySelector("canvas");
canvas.style.backgroundColor = "#302c2c";

const ctx = canvas.getContext("2d");

const startBtn = document.querySelector("#start");
const restartBtn = document.querySelector("#restart");

window.addEventListener("load", () => {
  startBtn.addEventListener("click", () => {
    // start
  });

  restartBtn.addEventListener("click", () => {
    // restart
  });
});
