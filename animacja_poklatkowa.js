
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let radius = 10;
let gravity = -5;
let speedX = 5;
let speedY = 5;
let ballX = radius;
let ballY = canvas.height / 2;
function count_speedY(){
    speedY -= gravity;
    move()
}
function move() {
    ballX += speedX;
    ballY += speedY;
    collision()
}
function collision() {
    if (ballY <= radius){
        ballY = radius;
        speedY = -speedY;
    }
    if (ballY - radius >= canvas.height){
        ballY = canvas.height - radius;
        speedY = -speedY;
    }
    if (ballX <= radius){
        ballX = radius;
        speedX = -speedX;
    }
    if (ballX + radius >= canvas.width){
        ballX = canvas.width - radius;
        speedX = -speedX;
    }
    draw()
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.arc(ballX, ballY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    setTimeout(count_speedY, 50);
}
window.onload = draw;
