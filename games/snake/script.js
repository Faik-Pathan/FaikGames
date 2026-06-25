// ======================================
// Faik Snake Game V3
// Part 1
// ======================================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Score
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

// Grid
const grid = 20;
const rows = canvas.height / grid;
const cols = canvas.width / grid;

// Snake
let snake = [
    {
        x:10,
        y:10
    }
];

// Direction
let dx=1;
let dy=0;

// Food
let food={
    x:15,
    y:10
};

// Score
let score=0;

let highScore=
Number(localStorage.getItem("highScore"))||0;

highScoreText.textContent=highScore;

// Game
let gameSpeed=120;
let gameLoop;
let gameOver=false;
// ==========================
// Keyboard Controls
// ==========================

document.addEventListener("keydown", changeDirection);

function changeDirection(e){

    if(e.key==="ArrowRight" && dx!==-1){
        dx=1;
        dy=0;
    }

    if(e.key==="ArrowLeft" && dx!==1){
        dx=-1;
        dy=0;
    }

    if(e.key==="ArrowUp" && dy!==1){
        dx=0;
        dy=-1;
    }

    if(e.key==="ArrowDown" && dy!==-1){
        dx=0;
        dy=1;
    }

    if(e.key==="r" || e.key==="R"){
        restartGame();
    }

}

// ==========================
// Food Generator
// ==========================

function createFood(){

    let valid=false;

    while(!valid){

        food={

            x:Math.floor(Math.random()*cols),

            y:Math.floor(Math.random()*rows)

        };

        valid=true;

        for(let part of snake){

            if(part.x===food.x && part.y===food.y){

                valid=false;
                break;

            }

        }

    }

}
// ==========================
// Draw Game
// ==========================

function draw(){

    if(gameOver){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle="red";
        ctx.font="50px Arial";
        ctx.fillText("GAME OVER",120,180);

        ctx.font="25px Arial";
        ctx.fillStyle="white";
        ctx.fillText("Press R to Restart",150,230);

        return;

    }

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw Food
    ctx.fillStyle="red";

    ctx.fillRect(

        food.x*grid,

        food.y*grid,

        grid-2,

        grid-2

    );

    // Draw Snake
    snake.forEach((part,index)=>{

        if(index===0){

            ctx.fillStyle="#00ff00";

        }else{

            ctx.fillStyle="#55ff55";

        }

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
        // Self Collision
    for(let i=0;i<snake.length;i++){

        if(
            head.x===snake[i].x &&
            head.y===snake[i].y
        ){

            gameOver=true;

        }

    }

    if(gameOver){

        return;

    }

    // Add Head
    snake.unshift(head);

    // Food Collision
    if(
        head.x===food.x &&
        head.y===food.y
    ){

        score++;

        scoreText.textContent=score;

        // High Score
        if(score>highScore){

            highScore=score;

            localStorage.setItem(
                "highScore",
                highScore
            );

            highScoreText.textContent=
            highScore;

        }

        // New Food
        createFood();

    }else{

        snake.pop();

    }
        // Wall Wrap
    if (snake[0].x < 0) snake[0].x = cols - 1;
    if (snake[0].x >= cols) snake[0].x = 0;

    if (snake[0].y < 0) snake[0].y = rows - 1;
    if (snake[0].y >= rows) snake[0].y = 0;

    // Increase Speed
    if (score > 0 && score % 5 === 0 && gameSpeed > 60) {

        gameSpeed -= 2;

        clearInterval(gameLoop);

        gameLoop = setInterval(draw, gameSpeed);

    }

}
// ==========================
// Restart Game
// ==========================

function restartGame(){

    snake=[
        {
            x:10,
            y:10
        }
    ];

    dx=1;
    dy=0;

    score=0;

    scoreText.textContent=score;

    gameSpeed=120;

    gameOver=false;

    createFood();

    clearInterval(gameLoop);

    gameLoop=setInterval(draw,gameSpeed);

}

// ==========================
// Start Game
// ==========================

createFood();

gameLoop=setInterval(draw,gameSpeed);
// ==========================
// Pause Game
// ==========================

let paused = false;

document.addEventListener("keydown", function(e){

    if(e.key==="p" || e.key==="P"){

        paused = !paused;

        if(paused){

            clearInterval(gameLoop);

        }else{

            clearInterval(gameLoop);

            gameLoop = setInterval(draw, gameSpeed);

        }

    }

});

// ==========================
// Draw Grid
// ==========================

function drawGrid(){

    ctx.strokeStyle = "#2b2b2b";

    for(let x=0; x<=canvas.width; x+=grid){

        ctx.beginPath();

        ctx.moveTo(x,0);

        ctx.lineTo(x,canvas.height);

        ctx.stroke();

    }

    for(let y=0; y<=canvas.height; y+=grid){

        ctx.beginPath();

        ctx.moveTo(0,y);

        ctx.lineTo(canvas.width,y);

        ctx.stroke();

    }

}
// ==========================
// Win Screen
// ==========================

function checkWin(){

    if(score>=50){

        clearInterval(gameLoop);

        ctx.fillStyle="gold";
        ctx.font="45px Arial";
        ctx.fillText("YOU WIN!",170,180);

        ctx.font="25px Arial";
        ctx.fillStyle="white";
        ctx.fillText("Press R to Play Again",140,230);

    }

}

// ==========================
// Call Win Check
// ==========================

// draw() function ke END me,
// closing } se just pehle ye line honi chahiye

checkWin();
