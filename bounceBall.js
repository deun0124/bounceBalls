//dom 만들기
const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

var radius = 10;
var x = canvas.width/2
var y = canvas.height-40
var vx = 5;
var vy = 5;


function drawBall(){
   
    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fill();

    console.log("실행")
}


var bricks =[];
var brickCol = 5;
var brickRow = 5;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickTop = 10;
var brickLeft = 10;

for(var i=0; i<= brickCol; i++ ){
    bricks[i]=[];
    for(var j=0; j<= brickRow; j++){
        bricks[i][j] = {x:0, y:0, status :1}
    }
}
function drawBrick(){
    for(var i=0; i<=brickCol; i++){
        for(var j=0; j<=brickRow; j++){
            if(bricks[i][j].status == 1){
                var brickX = (j*(brickWidth+brickPadding)) + brickLeft;
                var brickY = (i*(brickHeight+brickPadding)) + brickTop;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle= "#FAAC58";
                ctx.fill();
                ctx.closePath();
            
            }
        }
    }
    

}

var paddleWidth = 100;
var paddleHeight = 15;
var paddleX=(canvas.width - paddleWidth) /2;
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#00BFFF";
    ctx.fill();
    ctx.closePath();

}
function draw(){
    //이전 프레임 지우기
    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawBall();
    drawBrick();
    drawPaddle();
    x += vx;
    y += vy;

     if(x<= radius || x >= canvas.width - radius){
         vx *= -1;
         x += vx;
     }else if(y<=radius || y>= canvas.height - radius){
         vy *= -1;
         y +=vy;
     }

     requestAnimationFrame(draw)
}

draw()