// 获取元素
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");

rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

let score = 0;
const brickRowCount = 5;
const brickColumnCount = 9;
const ctx = canvas.getContext("2d");

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

const paddle = {
  x: canvas.width /2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
}

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  for (let j = 0; j < brickColumnCount; j++) {
    const x = j * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = i * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i*brickColumnCount+j] = {x, y, ...brickInfo};
  }
}

function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === "ArrowRight" || e.key === "Right" || e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = 0;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`得分: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach(brick => {
    ctx.beginPath();
    ctx.rect(brick.x, brick.y, brick.w, brick.h);
    ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
    ctx.fill();
    ctx.closePath();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function movePaddle() {
  paddle.x += paddle.dx;
  // 设置边界
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }  
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // 撞击左右侧界面
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1 撞击后反弹
  }

  // 撞击上下边界
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // 撞击挡板
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy *= -1;
  }

  // 撞击砖块
  bricks.forEach(brick => {
    if (brick.visible) {
      if (
        ball.x - ball.size > brick.x && // 撞击砖块左侧
        ball.x + ball.size < brick.x + brick.w && // 撞击砖块右侧
        ball.y + ball.size > brick.y && // 撞击砖块顶部
        ball.y - ball.size < brick.y + brick.h // 撞击砖块底部
      ) {
        ball.dy *= -1;
        brick.visible = false;
        increaseScore();
      }
    }
  }); 
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function increaseScore() {
  score++;
  if (score % (brickColumnCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

function showAllBricks() {
  bricks.forEach(brick => brick.visible = true);
}

function update() {
  movePaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}
update();