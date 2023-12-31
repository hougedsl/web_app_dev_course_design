const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let score = 0;
const brickRowCount = 9;
const brickColumCount = 5;
// 创建撞击球
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 1,
    dx: 2,
    dy: -2,
};
// 创建挡板
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 150,
    h: 10,
    speed: 5,
    dx: 0,
};
// 创建单个方块
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) +
            brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) +
            brickInfo.offsetY;
        bricks[i][j] = {
            x,
            y,
            ...brickInfo
        };
    }
}
// 所有绘制函数
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle();
    drawBall();
    drawScore();
    drawBricks();
}
// 绘制方块
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? "#0095dd" : 'transparent';
            ctx.fill();
            ctx.closePath();
        })
    })
}
// 绘制得分
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`得分:${score}`, canvas.width - 100, 30);
}
// 绘制撞击球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}
// 绘制挡板
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}
// 移动挡板
function movePaddle() {
    paddle.x += paddle.dx;
    // 设置边界
    // 右边界
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    // 左边界
    if (paddle.x < 0) {
        paddle.x = 0
    }
}
// 移动小球
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    // 撞击左右侧界面
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1; //反弹 -1向下,1向上
    }
    // 撞击上下侧界面
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1; //反弹 -1向下,1向上
    }
    // 撞击挡板
    if (ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y) {
        ball.speed += 0
        ball.dy = -(ball.speed);
    }
    // 撞击砖块
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && //撞击左侧
                    ball.x + ball.size < brick.x + brick.w && //撞击右侧
                    ball.y + ball.size > brick.y && //撞击顶部
                    ball.y - ball.size < brick.y + brick.h //撞击底部
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseSource()
                }
            }
        });
    });
    // 没有接到小球分数清零
    if(ball.y+ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}
// 增加得分
function increaseSource() {
    score++;
    if(score % (brickColumCount * brickRowCount) === 0) {
        showAllBricks();
        score = 0;
    }
}
// 再次显示所有砖块
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        });
    });
}
// 创建update函数,更新所有绘制函数和动画
function update() {
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update);
}
update();
// 键盘函数
function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === "Right") {
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === "Left") {
        paddle.dx = -paddle.speed;
    }
}
function keyUp(e) {
  if (e.key === 'ArrowRight' || e.key === "Right" ||
      e.key === 'ArrowLeft' || e.key === "Left") {
      paddle.dx = 0
  } else if (e.key === 'ArrowLeft' || e.key === "Left" ||
      e.key === 'ArrowRight' || e.key === "Right") {
      paddle.dx = 0
  }
}
// 事件监听
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  rules.classList.remove('show');
})
rules.addEventListener('click', () => {
  rules.classList.remove('show');
})