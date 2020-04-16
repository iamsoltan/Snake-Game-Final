let menu = document.getElementById('menuCanvas'); 
let canv = document.getElementById('gameCanvas');
let contxt = canv.getContext("2d");
let box = 16;

canv.style.display = 'none';
menu.style.display = 'block';

// Preparing the menu content
let MC = menu.getContext('2d'); // MC is Menu Context

//Making the background color
MC.fillStyle = 'lightblue';
MC.fillRect(0, 0, 608, 550);

//Making the menu button

MC.fillStyle = 'white';
MC.fillRect(220, 340, 140, 50);

MC.font = "20px helvetica";
MC.strokeText('New Game', 240, 370);



/*************************************/


//Direction check
let dir;
document.addEventListener('keydown', (event) => {
    let d = event.keyCode

    if (d == 37 && dir != 'RIGHT') {
        dir = 'LEFT'
    } else if (d == 38 && dir != 'DOWN') {
        dir = 'UP'
    } else if (d == 39 && dir != 'LEFT') {
        dir = 'RIGHT'
    } else if (d == 40 && dir != 'UP') {
        dir = 'DOWN'
    }
})


//Creating the snake object
let snake = [];
snake[0] = {
    x: box,
    y: 0
}
snake[1] = {
    x: 0,
    y: 0
}
let food = []
food[0] = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 17 + 1) * box
}
let score = 0;


function draw() {
    /**********Snake body and food drowing*************/ 
    //Drawing background 
    contxt.fillStyle = 'teal'
    contxt.fillRect(0, 0, 608, 550);


    //Drawing the snake
    for (let i = 0; i < snake.length; i++) {
        contxt.fillStyle = (i == 0) ? 'red' : 'purple';
        contxt.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //Drawing food


    contxt.fillStyle = 'brown';
    contxt.fillRect(food[0].x, food[0].y, box, box);

    //Getting the head and tay coords
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let snakeTailX = snake[snake.length - 1].x;
    let snakeTailY = snake[snake.length - 1].y;
    
     /***************Snake direction and borders conditions***************/

    //position of new head
    switch (dir) {
        case 'LEFT':
            snakeX -= box
            break;
        case 'UP':
            snakeY -= box
            break;
        case 'RIGHT':
            snakeX += box
            break;
        case 'DOWN':
            snakeY += box
            break;

    }
    if (snakeX < 0) {
        snakeX = 608
    }
    if (snakeX > 608) {
        snakeX = 0
    }
    if (snakeY < 0) {
        snakeY = 544
    }
    if (snakeY > 544) {
        snakeY = 0
    }

}

 /**************Snake Growth****************/ 
 if (snakeX == food[0].x && snakeY == food[0].y) {
    let block = { x: snakeTailX, y: snakeTailY };
    snake.push(block)
    let foody = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 17 + 1) * box
    }
    food.push(foody);
    food.shift()
    score++;

}


contxt.fillStyle = 'black';
contxt.fillText(`Score: ${score}`, 500, 500)




var game = setInterval(draw, 60)
var hs = setInterval(highscore, 60)
