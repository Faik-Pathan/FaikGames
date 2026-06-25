// ==============================
// Snake Game - Lesson 1
// Developed by Faik Pathan
// ==============================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid Size
const box = 20;

// Snake
let snake = [
    { x: 10, y: 10 }
];
// Food
let food = {
    x: Math.floor(Math.random() * 30),
    y: Math.floor(Math.random() * 20)
};

// Score
let score = 0;
// Direction
let dx = 1;
let dy = 0;

// Keyboard Controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {

    if (event.key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }

    if (event.key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    }

    if (event.key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    }

    if (event.key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    }
}

// Draw Game
function draw() {

    // Clear Screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    ctx.fillStyle = "lime";

    snake.forEach(function(part) {

        ctx.fillRect(
            part.x * box,
            part.y * box,
            box - 2,
            box - 2
        );
        // Draw Food
ctx.fillStyle = "red";

ctx.fillRect(
    food.x * box,
    food.y * box,
    box - 2,
    box - 2
);
// Draw Score
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText("Score : " + score, 10, 25);
    });

    // New Head
    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);
// Eat Food
if (
    head.x === food.x &&
    head.y === food.y
) {

    score++;

    food = {
        x: Math.floor(Math.random() * 30),
        y: Math.floor(Math.random() * 20)
    };

}
else{

    snake.pop();

}
    

    // Wall Wrap
    if (snake[0].x < 0) snake[0].x = 29;
    if (snake[0].x > 29) snake[0].x = 0;

    if (snake[0].y < 0) snake[0].y = 19;
    if (snake[0].y > 19) snake[0].y = 0;

}

// Game Speed
setInterval(draw, 150);