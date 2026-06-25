// ===============================
// Snake Game - Lesson 5
// Developed by Faik Pathan
// ===============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");

const grid = 20;

const rows = canvas.height / grid;
const cols = canvas.width / grid;

let snake = [
    { x: 10, y: 10 }
];

let dx = 1;
let dy = 0;

let score = 0;

// Keyboard Controls
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }

    if (e.key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    }

    if (e.key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    }

    if (e.key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    }

});

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw Snake
    ctx.fillStyle="#00ff66";

    snake.forEach(part=>{

        ctx.fillRect(
            part.x*grid,
            part.y*grid,
            grid-2,
            grid-2
        );

    });

    // New Head
    const head={
        x:snake[0].x+dx,
        y:snake[0].y+dy
    };

    snake.unshift(head);

    snake.pop();

    // Wrap Screen
    if(snake[0].x<0) snake[0].x=cols-1;
    if(snake[0].x>=cols) snake[0].x=0;

    if(snake[0].y<0) snake[0].y=rows-1;
    if(snake[0].y>=rows) snake[0].y=0;

    scoreText.textContent=score;

}

setInterval(draw,120);