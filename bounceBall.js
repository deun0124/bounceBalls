//dom 만들기
const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

var radius = 10;
var x = canvas.width / 2
var y = canvas.height - 40
var vx = 5;
var vy = 5;


function drawBall() {

    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

}


var bricks = [];
var brickCol = 6;
var brickRow = 6;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickTop = 20;
var brickLeft = 10;

for (var i = 0; i < brickCol; i++) {
    bricks[i] = [];
    for (var j = 0; j < brickRow; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 }
    }
}
function drawBrick() {
    for (var i = 0; i < brickCol; i++) {
        for (var j = 0; j < brickRow; j++) {
            if (bricks[i][j].status == 1) {
                var brickX = (j * (brickWidth + brickPadding)) + brickLeft;
                var brickY = (i * (brickHeight + brickPadding)) + brickTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#FAAC58";
                ctx.fill();
                ctx.closePath();

            }
        }
    }


}

var paddleWidth = 100;
var paddleHeight = 15;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddlePadding= canvas.height - paddleHeight*2
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight*2, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00BFFF";
    ctx.fill();
    ctx.closePath();

}

const gameEnd = document.querySelector('.gameEnd')
function showGameOverText() {
    gameEnd.style.display = "block";
}



var score = 0;
var lives = 3;



function bouncBall() {
    for (var i = 0; i < brickCol; i++) {
        for (var j = 0; j < brickRow; j++) {
            var b = bricks[i][j];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {

                    vy *= -1;
                    b.status = 0;
                    score++;
                    scoreDisplay.innerText = score

                    console.log(bricks[i][j])
                    if (score == brickRow * brickCol) {
                        alert("이겼습니다.")
                        document.location.reload();

                    }
                }
            }
        }
    }

}



const livesDisplay = document.querySelector('.live')
const scoreDisplay = document.querySelector('.score')

const restartButton = document.querySelector('.restartButton')
restartButton.addEventListener('click', () => {
    gameEnd.style.display = "none"
    document.location.reload()
})

document.addEventListener('mousemove', mouseMove);

function mouseMove(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX <canvas.width){
        paddleX= relativeX - paddleWidth/2;
    }


}

function draw() {
    //이전 프레임 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawBrick();
    drawPaddle();
    bouncBall();
    livesDisplay.innerText = lives;

    x += vx;
    y += vy;

    // 벽에 맞으면 반대로 튕겨내기
    if (x <= radius || x >= canvas.width - radius) {
        vx *= -1;

    } else if (y <= radius) {
        vy *= -1;

    } else if (y >=paddlePadding) {
        if (x > paddleX && x < paddleX + paddleWidth) {

            vy *= -1;
        } else {
            lives--;

            if (!lives) {
                alert("Game Over..")

                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 40;
                vx = 5;
                vy = -5;
                paddleX = (canvas.width - paddleWidth) / 2;
            }

        }

    }

    requestAnimationFrame(draw)
}

draw()